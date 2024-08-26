import express, { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();
const prisma = new PrismaClient();

router.get("/drive", async (req: Request, res: Response) => {
  const files = await prisma.file.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const users = await prisma.user.findMany();

  const user = req.session.user as User | undefined;

  res.render("drive", {
    title: "Drive",
    loggedUser: user?.nickName,
    files,
    users: users,
    logged: !!user,
  });
});

router.get("/drive/new-file", (req: Request, res: Response) => {
  const user = req.session.user as User | undefined;

  if (!user) {
    return res.redirect("/log-in");
  }

  res.render("new-file", { title: "New File" });
});

router.post(
  "/drive/add-file",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const user = req.session.user as User | undefined;

    if (!user) {
      return res.redirect("/log-in");
    }

    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    if (!req.file) {
      return res.redirect("/drive");
    }

    const file = await prisma.file.create({
      data: {
        userId: user.id,
        fileName: req.body.fileName,
        filePath: req.file.path,
        createdAt: new Date(),
      },
    });

    res.redirect("/drive");
  }
);

export default router;

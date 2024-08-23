import express, { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/drive", async (req: Request, res: Response) => {
  const files = await prisma.file.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });


  const user = req.session.user as User | undefined;

  res.render("drive", {
    title: "Drive",
    files,
    user: user?.nickName,
    logged: !!user,
  });
});

router.get("/drive/new-file", (req: Request, res: Response) => {
  res.render("new-file", { title: "New File" });
});

router.post("/drive/new-file", async (req: Request, res: Response) => {
  const user = req.session.user as User | undefined;

  if (!user) {
    return res.redirect("/log-in");
  }

  const file = await prisma.file.create({
    data: {
      userId: user.id, // Używaj id użytkownika
      fileName: req.body.name,
      filePath: req.body.path,
    },
  });

  res.redirect("/drive");
});

export default router;

import express, { Request, Response } from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

router.get("/sign-up", (req: Request, res: Response) => {
  res.render("sign-up", { title: "Sign Up" });
});

router.post("/sign-up", async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await prisma.user.create({
    data: {
      nickName: req.body.nickname,
      password: hashedPassword,
    },
  });
  res.redirect("/log-in");
});

export default router;

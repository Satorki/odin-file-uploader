import express, { Request, Response } from "express";
const router = express.Router();
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

router.get("/log-in", (req: Request, res: Response) => {
  res.render("log-in", { title: "Log In" });
});

router.post("/log-in", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      nickName: req.body.nickname,
    },
  });

  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    req.session.user = user;
    res.redirect("/drive");
  } else {
    res.redirect("/log-in");
  }
});

export default router;

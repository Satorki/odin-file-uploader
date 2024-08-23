import express, { Request, Response } from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.get("/drive", async (req: Request, res: Response) => {
  const files = await prisma.file.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.render("drive", { title: "Drive", files });
});

export default router;

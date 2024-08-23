import express, { Request, Response } from "express";
const router = express.Router();

router.get("/sign-up", (req: Request, res: Response) => {
  res.render("sign-up", { title: "Sign Up" });
});

export default router;

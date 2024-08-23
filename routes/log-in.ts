import express, { Request, Response } from "express";
const router = express.Router();

router.get("/log-in", (req: Request, res: Response) => {
  res.render("log-in", { title: "Log In"});
});

export default router;

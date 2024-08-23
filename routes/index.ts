import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Main Page", logged: !!req.session.user });
});

export default router;

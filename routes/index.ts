import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "Main Page",
    user: req.session.user?.nickName,
    logged: !!req.session.user,
  });
});

export default router;

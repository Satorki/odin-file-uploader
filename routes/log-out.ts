import express, { Request, Response } from "express";
const router = express.Router();


router.post("/log-out", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.redirect("/");
    }
    res.redirect("/");
  });
});

export default router;

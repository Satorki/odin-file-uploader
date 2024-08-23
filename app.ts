import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import indexRoutes from "./routes/index";
import loginRoutes from "./routes/log-in";
import signupRoutes from "./routes/sign-up";
import driveRoutes from "./routes/drive";

const prisma = new PrismaClient();
const app = express();

// DOTENV CONFIG
dotenv.config();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// ROUTER
app.use("/", indexRoutes);
app.use("/", loginRoutes);
app.use("/", signupRoutes);
app.use("/", driveRoutes);

// APP START
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     nickName: "sk",
  //     password: "test",
  //   },
  // });
  // console.log(user);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

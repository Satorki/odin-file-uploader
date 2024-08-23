// SESSION IMPORT
import session from "express-session";
import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

// EXPRESS START
import express, { Request, Response } from "express";
const app = express();

// DOTENV CONFIG
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSION CONFIG
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// ENGINE EJS START
app.set("view engine", "ejs");

// ROUTERS
import indexRoutes from "./routes/index";
import loginRoutes from "./routes/log-in";
import signupRoutes from "./routes/sign-up";
import driveRoutes from "./routes/drive";
app.use("/", indexRoutes);
app.use("/", loginRoutes);
app.use("/", signupRoutes);
app.use("/", driveRoutes);

// APP START
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// const prisma = new PrismaClient();
// async function main() {
//   const showUsers = await prisma.user.findMany();
//   console.log(showUsers);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

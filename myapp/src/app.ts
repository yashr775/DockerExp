import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 3000;

const app = express();

mongoose
  .connect(process.env.MONGO_URI!, {
    dbName: "dockerExp",
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// your routes here

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use(errorMiddleware);

app.listen(port, () =>
  console.log("Server is working on Port:" + port + " in " + envMode + " Mode.")
);

const createUser = async(name:string,email:string) =>{
  const schema = new mongoose.Schema({
    name:{type:String , requuired:true },
    email:{type:String , required:true}
  })
  const User = mongoose.model("User",schema);
  await User.create({name,email})
  console.log("User created")
}

await createUser("Ankit","ankit@gmail.com")



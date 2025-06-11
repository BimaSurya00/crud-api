import express from "express";
import { AppDataSource } from "./config/database";
import router from "./routes/user.routes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

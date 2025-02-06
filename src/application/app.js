import express from "express";
import dotenv from "dotenv";
import { router } from "../route/route.js";

dotenv.config();
export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

import express, { Request, Response } from "express";
import dotenv from "dotenv";
const nodemailer = require("nodemailer");

dotenv.config();
const cors = require("cors");
const router = express.Router();
const contentful = require("contentful");

export const contentfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

router.use(cors(corsOptions));

router.get("/ping", (req, res) => {
  res.status(200).json("The server is up and running");
});

router.get("/entries", async (req, res) => {
  const entries = await contentfulClient.getEntries();
  if (entries) {
    res.status(200).json(entries);
  }
});

router.get("/entries/:entry_title", async (req, res) => {
  const entry_title = req.params.entry_title;
  console.log(entry_title);
  const entries = await contentfulClient.getEntries();
  if (entries) {
    const entry = entries.items.find(
      (item: any) => item.fields.name === entry_title
    );
    res.status(200).json(entry);
  }
});

router.post("/send-email", async (req, res) => {
  console.log("inside endpoint!");
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_SENDER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    to: process.env.GMAIL_RECEIVER,
    subject: "New message from a visitor",
    text: `Name: ${name} \n Email: ${email} \n \n Message: \n \n ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

export default router;

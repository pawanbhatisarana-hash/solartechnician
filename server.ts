import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Configure your email transporter
    // Note: For Gmail, you should use an App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // Your gmail email
        pass: process.env.SMTP_PASS, // Your gmail app password
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "solartechnicianajmer@gmail.com",
      subject: `New Solar Service Enquiry from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
      html: `
        <h3>New Solar Service Enquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    try {
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error("SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS in the Settings menu.");
      }
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      
      let errorMessage = "Failed to send email";
      if (error instanceof Error && error.message.includes("535")) {
        errorMessage = "Invalid Gmail credentials. You must use a Gmail 'App Password', not your regular login password. Please check the App Settings.";
      }

      res.status(500).json({ 
        error: errorMessage, 
        details: error instanceof Error ? error.message : "Internal server error" 
      });
    }
  });

  // Vite middleware for development (disabled for pure HTML/CSS/JS version)
  const distPath = path.join(process.cwd());
  app.use(express.static(distPath));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

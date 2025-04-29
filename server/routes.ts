import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form API endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const formData: ContactFormData = req.body;
      
      // Validate the form data
      if (!formData.name || !formData.email || !formData.message) {
        return res.status(400).json({ 
          message: "All fields are required"
        });
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return res.status(400).json({ 
          message: "Invalid email address"
        });
      }
      
      // In a real application, you would send an email or store the message in the database
      console.log("Contact form submission:", formData);
      
      // Return success response
      return res.status(200).json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you soon!" 
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ 
        message: "An error occurred while processing your request" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

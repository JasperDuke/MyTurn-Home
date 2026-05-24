"use server";

import nodemailer from "nodemailer";

export async function sendDemoEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const restaurantName = formData.get("restaurantName") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !restaurantName) {
    return { success: false, error: "Please fill out all required fields." };
  }

  // Create transporter using environment variables. 
  // User should set EMAIL_USER (e.g. [EMAIL_ADDRESS]) and EMAIL_PASS in .env.local
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_USER,
    to: process.env.NEXT_PUBLIC_EMAIL_TO,
    subject: `New Demo Request: ${restaurantName} (${name})`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Demo Request</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; color: #0f172a; }
          .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #EC4899 0%, #F97316 100%); padding: 32px 24px; text-align: center; }
          .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; }
          .content { padding: 32px 24px; }
          .field { margin-bottom: 24px; }
          .label { font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600; margin-bottom: 8px; }
          .value { font-size: 16px; color: #0f172a; background: #f1f5f9; padding: 12px 16px; border-radius: 8px; font-weight: 500; }
          .footer { background: #f8fafc; padding: 24px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New MyTurn Demo Request</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Restaurant Name</div>
              <div class="value">${restaurantName}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value">${message || "No additional message provided."}</div>
            </div>
          </div>
          <div class="footer">
            Flow into Flavor · MyTurn Optimization Engine
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send the request. Please try again later." };
  }
}

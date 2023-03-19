import nodemailer from "nodemailer";
import { MAIL_SETTINGS } from "../constants/constant.js";

const transporter = nodemailer.createTransport(MAIL_SETTINGS);

export async function sendMail(params) {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "OTP Email",
      html: `
      <div>
       <h1 style="font-size: 24px; color: #333;">Your One-Time Password</h1>
    <p style="font-size: 18px; color: #555;">Use the following password to complete your login:</p>
    <h2 style="font-size: 36px; color: #000;">${params.OTP}</h2>
    <p style="font-size: 18px; color: #555;">This password is valid for the next 10 minutes. Do not share it with anyone.</p>
    <p style="font-size: 18px; color: #555;">If you did not request this OTP, please contact support immediately.</p>
      </div>
        `,
    });

    return info;
  } catch (err) {
    return false;
  }
}

export async function sendMailtoTeacher(params) {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "OTP Email",
      html: `
      <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 10px;">
      <h1 style="text-align: center; color: #4b4b4b;">Your OTP for Teacher Login</h1>
      <p style="font-size: 16px; color: #4b4b4b;">Dear ${params.to},</p>
      <p style="font-size: 16px; color: #4b4b4b;">Thank you for choosing our platform for education. Please find your OTP below to complete the login process:</p>
      <h2 style="background-color: #f7f7f7; padding: 10px; font-size: 24px; text-align: center; color: #4b4b4b;">${params.OTP}</h2>
      <p style="font-size: 16px; color: #4b4b4b;">Please note that this OTP is valid for a single session only and will expire in 30 minutes.</p>
      <p style="font-size: 16px; color: #4b4b4b;">If you did not attempt to log in or have any concerns, please contact our support team.</p>
      <p style="font-size: 16px; color: #4b4b4b;">Thank you again for your trust and support.</p>
      <p style="font-size: 16px; color: #4b4b4b;">Best regards,<br>Online Edu</p>
    </div>
      `,
    });
    return info;
  } catch (error) {
    return false;
  }
}

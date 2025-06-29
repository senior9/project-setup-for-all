import  nodemailer from "nodemailer";
import config from "../config";

// Create a test account or replace with real credentials.
export const sendEmail= async(to:string, html:string)=>{
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: config.node_env==='production', // true for 465, false for other ports
  auth: {
    user: "abhishek.sikdar03@gmail.com",
    pass: "aejz nlhs btuc weez",
  },
});

  await transporter.sendMail({
    from: 'ovi215188@gmail.com',
    to ,
    subject: "Reset Password",
    text: "Hello world?", // plain‑text body
    html, // HTML body
})

}
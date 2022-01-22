import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";

class SenderSendgrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({
      ...msg,
      from: process.env.SENDGRID_EMAIL,
    });
  }
}

class SenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: process.env.USER_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER,
      },
    };
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({
      ...msg,
      from: process.env.USER_NODEMAILER,
    });
  }
}

export { SenderSendgrid, SenderNodemailer };

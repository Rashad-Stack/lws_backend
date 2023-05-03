const path = require("path");
// var hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const emailText=require("../views/welcome")

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `LWS Learning portal <${process.env.ADMIN_EMAIL}>`;
  }

  createNewTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_ADD,
          pass: process.env.GMAIL_PASS
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  async send({subject, title, description,linkTitle, linkUrl}) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html:emailText({title,description,linkTitle,linkUrl})
    };

    // 3) Create a transport and send email
    await this.createNewTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const messages = {
      subject:'LWS Learning portal', title:"Welcome to LWS Learning portal.",description:"Welcome to the world best learning portal.",linkTitle:"Go to home", linkUrl:this.url
    }

    await this.send(messages);
  }
  async sendPasswordReset() {
    const messages = {
      subject:'LWS Learning portal reset your password.', title:"Password reset request.",description:"You password request only valid for 10 minutes.",linkTitle:"Reset Password", linkUrl:this.url
    }

    await this.send(messages);
  }
};

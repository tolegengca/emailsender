const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/sendEmail", async (req, res) => {
  const { user, pass, to, subject, text, filename, content, service } =
    req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp" + service,
    secure: false,
    port: 587,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: user,
    to,
    attachments: filename
      ? [
          {
            filename,
            content,
          },
        ]
      : null,
    subject,
    text,
  };
  console.log(req.body);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).send({
        message: "Something went wrong, check out inputs and try again!",
      });
    } else {
      res.status(200).send({ message: info.response });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

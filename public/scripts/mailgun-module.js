require("dotenv").config();

const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const email = {
  from: "PineaPOLL <diogosp4m@gmail.com>",
  to: "aidanemiddleton@gmail.com",
  subject: "Hello",
  text: "This is the Creator"
};

// data must be in the format of email object
const sendMailGun = data => {
  mg.messages().send(data, function(error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
};
module.exports = sendMailGun;

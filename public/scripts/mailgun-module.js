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
  text: "If youre getting this, mailgun fucking worked"
};

// const voteLinkEmail = {
//   from: "PineaPOLL <diogosp4m@gmail.com>",
//   to: "aidanemiddleton@gmail.com",
//   subject: "You've been invited to take place in a poll",
//   text: "Hello! You have been in invited to take part in a poll hosted by pineapPOLL. To vote, all you have to do is follow"
// };

// data must be in the format of email object
// module.exports = data => {
//   mg.messages().send(data, function(error, body) {
//     if (error) {
//       console.log(error);
//     }
//     console.log(body);
//   });
// };

mg.messages().send(email, (err, body) => {
  err ? console.log(err) : console.log(body);
});


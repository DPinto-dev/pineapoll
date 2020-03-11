const mailgun = require("mailgun-js");
const DOMAIN = 'YOUR_DOMAIN_NAME';
const mg = mailgun({apiKey: '', domain: ''});
const email = {
	from: 'PineaPOLL <aidanemiddleton@gmail.com>',
	to: 'aidanemiddleton@gmail.com',
	subject: 'Hello',
	text: 'If youre getting this, mailgun fucking worked'
};


// data must be in the format of email object
const sendEmail = function(data) {
  mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
}


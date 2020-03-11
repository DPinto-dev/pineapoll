const mailgun = require("mailgun-js");
const DOMAIN = 'YOUR_DOMAIN_NAME';
const mg = mailgun({apiKey: 'a5b4e2ec897beb7da36ca5ec124c053b-ee13fadb-ee62acc2', domain: 'sandbox14b08c1e1b784f69a2ff718276533c30.mailgun.org'});
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


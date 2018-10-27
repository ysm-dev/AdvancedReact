const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

exports.makeANiceEmail = text => `
	<div class="email" style="
		border: 1px solid black;
		padding: 20px;
		font-familly: sans-serif;
		line-height: 2;
		font-size: 20px;
	">
		<h2>Hello There!</h2>
		<p>${text}</p>
		<p>😘, Chris Yang</p>
	</div>
`

exports.transport = transport

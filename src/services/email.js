require('dotenv').config()
const fetch = require('node-fetch')

const MAIL_SERVICE_URL = 'https://api.emailjs.com'
const {
	EMAILJS_SERVICE_ID: service_id,
	EMAILJS_TEMPLATE_ID: template_id,
	EMAILJS_API_KEY: user_id,
	EMAILJS_TOKEN: accessToken,
} = process.env

class EmailService {
	email = 'asami.mayuri1@gmail.com'
	recipientName = 'Asa Romi'

	constructor(email, senderName) {
		this.email = email
		this.recipientName = senderName
	}

	async sendEmail({ email, sender, body }) {
		return await fetch(`${MAIL_SERVICE_URL}/api/v1.0/email/send`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				service_id,
				template_id,
				user_id,
				accessToken,
				template_params: {
					from_name: sender,
					to_name: this.recipientName,
					message: body,
					from_email: email,
					to_email: this.email,
				},
			}),
		})
			.then(async (res) => {
				if (res.status !== 200) {
					throw new Error('Failed to send email')
				}

				return await res.text()
			})
			.catch((err) => {
				console.error(err)
			})
	}
}

module.exports = EmailService

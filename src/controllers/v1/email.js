const Service = require('../../services/email')
const emailService = new Service()

exports.sendEmail = async (req, res) => {
  try {
    const {email: email, name: sender, message: body} = req.body

    const response = await emailService.sendEmail({
      email,
      sender,
      body,
    })

    return res.status(200).json({ status: 'OK', message: `[${response}] Successfully sending email` })
  } catch (error) {
    console.error('failed to send email', error)
    return res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

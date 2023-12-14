const Service = require('../services/email')
const {successResponse, errorResponse} = require('../libs/response')
const emailService = new Service()

exports.sendEmail = async (req, res) => {
  try {
    const {email: email, name: sender, message: body} = req.body

    const response = await emailService.sendEmail({
      email,
      sender,
      body,
    })

    return successResponse(res, {data: response})
  } catch (error) {
    return errorResponse(res, {error})
  }
}

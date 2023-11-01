exports.errorResponse = (res, { error, statusCode = 500 }) => {
  return res.status(statusCode).json({ status: 'ERROR', error: error.message })
}

exports.successResponse = (res, { data, statusCode = 200 }) => {
  return res.status(statusCode).json({ status: 'OK', data })
}

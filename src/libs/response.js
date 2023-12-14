require('dotenv').config()

const DEBUG = process.env.NODE_ENV === 'development'
const debugError = (...params) => {
  if (DEBUG) console.error(...params)
}
const debug = (...params) => {
  if (DEBUG) console.log(...params)
}

exports.errorResponse = (res, { error, statusCode = 500 }) => {
  const errorMessage = error?.message || error || 'Internal Server Error'
  debugError(errorMessage)

  return res.status(statusCode).json({ status: 'ERROR', error: errorMessage })
}

exports.successResponse = (res, { data, statusCode = 200 }) => {
  return res.status(statusCode).json({ status: 'OK', data })
}

exports.debugError = debugError
exports.debug = debug
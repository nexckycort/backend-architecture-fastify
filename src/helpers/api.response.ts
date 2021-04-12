import { FastifyReply } from 'fastify'

enum StatusCode {
  SUCCESS = '20000',
  FAILURE = '40001'
}

enum TypeErrors {
  TECHNICAL = 'Technical',
  BUSINESS = 'Business',
  NOTFOUND = 'Not Found',
  INTERNAL_ERROR = 'Internal error',
  BAD_REQUEST = 'Bad request',
  PAYLOAD_TOO_LARGE = 'Payload Too Large',
  UNAUTHORIZED = 'Authentication error',
  ECONNREFUSED = 'ECONNREFUSED',
  ECONNABORTED = 'ECONNABORTED',
  ECONNRESET = 'ECONNRESET'
}

enum ResponseStatus {
  OK = 200,
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  PAYLOAD_TOO_LARGE = 413,
  INTERNAL_ERROR = 500
}

export const SuccessResponseStatus = [200, 201]
export const ErrorResponseStatus = [400, 401, 404]

export const SuccessOkResponse = (res: FastifyReply, msg = 'OK', data?: unknown): FastifyReply => {
  const body = {
    message: msg,
    StatusCode: StatusCode.SUCCESS
  }
  if (data !== undefined) Object.assign(body, { data })
  return res.status(ResponseStatus.OK).send(body)
}

export const NotFoundError = (res: FastifyReply, message: string = TypeErrors.NOTFOUND): FastifyReply => {
  return responseError(message, ResponseStatus.NOT_FOUND, TypeErrors.BUSINESS, res)
}

export const AuthFailureError = (res: FastifyReply, message: string = TypeErrors.UNAUTHORIZED): FastifyReply => {
  return responseError(message, ResponseStatus.UNAUTHORIZED, TypeErrors.BUSINESS, res)
}

export const BadRequestError = (res: FastifyReply, message: string = TypeErrors.BAD_REQUEST): FastifyReply => {
  return responseError(message, ResponseStatus.BAD_REQUEST, TypeErrors.BUSINESS, res)
}

export const PayloadTooLargeError = (res: FastifyReply, message: string = TypeErrors.PAYLOAD_TOO_LARGE): FastifyReply => {
  return responseError(message, ResponseStatus.PAYLOAD_TOO_LARGE, TypeErrors.BUSINESS, res)
}

export const InternalError = (res: FastifyReply, message: string = TypeErrors.INTERNAL_ERROR): FastifyReply => {
  return responseError(message, ResponseStatus.INTERNAL_ERROR, TypeErrors.TECHNICAL, res)
}

export const responseError = (message: string, statusCode: number, error: string, res: FastifyReply): FastifyReply => {
  return res.status(statusCode).send({
    statusCode: StatusCode.FAILURE,
    message,
    error
  })
}

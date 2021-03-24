interface IResponseErrorOption {
  message: string,
  status: number,
  body: any,
  silent?: boolean
}

export class ResponseError extends Error {
  status: number
  body: any
  silent: boolean

  constructor ({ message, status = 500, body = {}, silent = false }: IResponseErrorOption) {
    super(message)
    this.status = status
    this.body = body
    this.silent = silent
  }
}

export class NotFoundError extends ResponseError {
  constructor (type: string, status: number = 404, silent: boolean = true) {
    super({
      message: 'Not Found',
      status,
      body: { notFoundError: type },
      silent,
    })
  }
}

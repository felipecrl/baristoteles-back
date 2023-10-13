import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import { errors } from 'celebrate'

import uploadConfig from '@config/upload'

import routes from '@shared/infra/http/routes'
import AppError from '@shared/errors/AppError'
import '@shared/infra/typeorm'
import '@shared/container'
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter'

const app = express()

app.use(cors())
app.use(express.json())
app.use(rateLimiter)

app.use('/files', express.static(uploadConfig.directory))

app.use(routes)

app.use(errors())

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

export { app }

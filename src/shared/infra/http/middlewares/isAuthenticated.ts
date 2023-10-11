import { NextFunction, Request, Response } from 'express'
import { verify, Secret } from 'jsonwebtoken'

import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

interface ITokenPaylod {
  iat: number
  exp: number
  sub: string
}

export default function isAythenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token is missing.')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret)

    const { sub } = decodedToken as ITokenPaylod

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT Token.')
  }
}

import { getCustomRepository } from 'typeorm'
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs'

import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository'
import UserTokenRepository from '@modules/users/typeorm/repositories/UserTokenRepository'

import AppError from '@shared/errors/AppError'

interface IRequest {
  token: string
  password: string
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository)
    const userTokenRepository = getCustomRepository(UserTokenRepository)

    const userToken = await userTokenRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('UserToken not found.')
    }

    const user = await usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.')
    }

    user.password = await hash(password, 8)

    await usersRepository.save(user)
  }
}

export default ResetPasswordService

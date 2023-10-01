import { getCustomRepository } from 'typeorm'

import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository'
import User from '@modules/users/typeorm/entities/Users'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}

export default ShowProfileService

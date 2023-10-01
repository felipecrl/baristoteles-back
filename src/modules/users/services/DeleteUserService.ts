import { getCustomRepository } from 'typeorm'

import UserRepository from '@modules/users/typeorm/repositories/UsersRepository'

import AppError from '@shared/errors/AppError'

interface IRequest {
  id: string
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne(id)

    if (!user) {
      throw new AppError('User not found')
    }

    await userRepository.remove(user)
  }
}

export default DeleteUserService

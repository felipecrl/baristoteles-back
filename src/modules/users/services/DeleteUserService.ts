import { inject, injectable } from 'tsyringe'

import { IDeleteUser } from '@modules/users/domain/models'
import { IUsersRepository } from '@modules/users/domain/repositopries/IUsersRepository'

import AppError from '@shared/errors/AppError'

injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IDeleteUser): Promise<void> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found')
    }

    await this.usersRepository.remove(user)
  }
}

export default DeleteUserService

import { inject, injectable } from 'tsyringe'

import { IUser, IUpdateUser } from '@modules/users/domain/models'
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository'

import AppError from '@shared/errors/AppError'

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    id,
    name,
    email,
    roles
  }: IUpdateUser): Promise<IUser> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found!')
    }

    user.name = name
    user.email = email
    user.roles = roles

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserService

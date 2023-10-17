import { inject, injectable } from 'tsyringe'

import { IUser, IShowUser } from '@modules/users/domain/models'
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository'

import AppError from '@shared/errors/AppError'

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IShowUser): Promise<IUser> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('Pub not found')
    }

    return user
  }
}

export default ShowUserService

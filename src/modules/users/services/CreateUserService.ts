import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'

import { ICreateUser, IUser } from '@modules/users/domain/models'
import { IUsersRepository } from '@modules/users/domain/repositopries/IUsersRepository'

import AppError from '@shared/errors/AppError'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email address already registered.')
    }

    const hashedPassword = await hash(password, 8)

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}

export default CreateUserService

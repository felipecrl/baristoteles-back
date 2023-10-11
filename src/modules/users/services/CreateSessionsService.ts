import { compare } from 'bcryptjs'
import { sign, Secret } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import authConfig from '@config/auth'

import { ICreateSession, IResponseSession } from '@modules/users/domain/models'
import { IUsersRepository } from '@modules/users/domain/repositopries/IUsersRepository'

import AppError from '@shared/errors/AppError'

@injectable()
class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    email,
    password
  }: ICreateSession): Promise<IResponseSession> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordConfirm = await compare(password, user.password)

    if (!passwordConfirm) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return { user, token }
  }
}

export default CreateSessionsService

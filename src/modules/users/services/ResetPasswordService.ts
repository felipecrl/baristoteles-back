import { inject, injectable } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs'

import { IResetPassword } from '@modules/users/domain/models'
import { IUsersRepository } from '@modules/users/domain/repositopries/IUsersRepository'
import { IUserTokenRepository } from '@modules/users/domain/repositopries/IUserTokenRepository'

import AppError from '@shared/errors/AppError'

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository
  ) {}

  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('UserToken not found.')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.')
    }

    user.password = await hash(password, 8)

    await this.usersRepository.save(user)
  }
}

export default ResetPasswordService

import { inject, injectable } from 'tsyringe'
import path from 'path'

import EtherealMail from '@config/mail/EtherealMail'
import SESMail from '@config/mail/SESMail'
import mailConfig from '@config/mail/mail'

import { ISendForgotPassword } from '@modules/users/domain/models'
import { IUsersRepository } from '@modules/users/domain/repositopries/IUsersRepository'
import { IUserTokenRepository } from '@modules/users/domain/repositopries/IUserTokenRepository'

import AppError from '@shared/errors/AppError'

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository
  ) {}

  public async execute({ email }: ISendForgotPassword): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found.')
    }

    const { token } = await this.userTokenRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          name: user.name,
          email: user.email
        },
        subject: '[Baristóteles] Recuperação de Senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/password/reset?token=${token}`
          }
        }
      })
    } else {
      await EtherealMail.sendMail({
        to: {
          name: user.name,
          email: user.email
        },
        subject: '[Baristóteles] Recuperação de Senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/password/reset?token=${token}`
          }
        }
      })
    }
  }
}

export default SendForgotPasswordEmailService

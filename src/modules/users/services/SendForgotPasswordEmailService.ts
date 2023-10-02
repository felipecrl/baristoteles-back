import { getCustomRepository } from 'typeorm'
import path from 'path'

import EtherealMail from '@config/mail/EtherealMail'
import SESMail from '@config/mail/SESMail'
import mailConfig from '@config/mail/mail'

import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository'
import UserTokenRepository from '@modules/users/typeorm/repositories/UserTokenRepository'

import AppError from '@shared/errors/AppError'

interface IRequest {
  email: string
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository)
    const userTokenRepository = getCustomRepository(UserTokenRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found.')
    }

    const { token } = await userTokenRepository.generate(user.id)

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
      return
    }

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

export default SendForgotPasswordEmailService

import { inject, injectable } from 'tsyringe'
import path from 'path'

import EtherealMail from '@config/mail/EtherealMail'
import SESMail from '@config/mail/SESMail'
import mailConfig from '@config/mail/mail'

import { ICreateUser, IUser } from '@modules/users/domain/models'
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository'
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider'

import AppError from '@shared/errors/AppError'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    roles
  }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email address already registered.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      roles
    })

    const welcomeTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'welcome.hbs'
    )

    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          name,
          email
        },
        subject: '[Baristóteles] Bem Vindo!',
        templateData: {
          file: welcomeTemplate,
          variables: {
            name
          }
        }
      })
    } else {
      await EtherealMail.sendMail({
        to: {
          name,
          email
        },
        subject: '[Baristóteles] Bem Vindo!',
        templateData: {
          file: welcomeTemplate,
          variables: {
            name
          }
        }
      })
    }

    return user
  }
}

export default CreateUserService

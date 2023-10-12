import { container } from 'tsyringe'

import { IPubsRepository } from '@modules/pubs/domain/repositories/IPubsRepository'
import PubRepository from '@modules/pubs/infra/typeorm/repositories/PubsRepository'
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository'
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository'

import '@modules/users/providers'

container.registerSingleton<IPubsRepository>('PubRepository', PubRepository)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokenRepository
)

import { DataSource } from 'typeorm'

import User from '../../../modules/users/infra/typeorm/entities/Users'
import UserToken from '../../../modules/users/infra/typeorm/entities/UserToken'
import Pub from '../../../modules/pubs/infra/typeorm/entities/Pubs'

import { CreatePubs1696007651742 } from './migrations/1696007651742-CreatePubs'
import { CreateUsers1696020637836 } from './migrations/1696020637836-CreateUsers'
import { CreateUserTokens1696166605494 } from './migrations/1696166605494-CreateUserTokens'
import { CreateNewColumnUser1696184755398 } from './migrations/1696184755398-CreateNewColumnUser'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apibaristoteles',
  entities: [User, UserToken, Pub],
  migrations: [
    CreatePubs1696007651742,
    CreateUsers1696020637836,
    CreateUserTokens1696166605494,
    CreateNewColumnUser1696184755398
  ]
})

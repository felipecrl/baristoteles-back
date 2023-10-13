import { Repository } from 'typeorm'

import UserToken from '@modules/users/infra/typeorm/entities/UserToken'
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository'

import { dataSource } from '@shared/infra/typeorm'

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = dataSource.getRepository(UserToken)
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOneBy({
      token
    })

    return userToken
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = await this.ormRepository.create({
      user_id
    })

    await this.ormRepository.save(userToken)

    return userToken
  }
}

export default UserTokenRepository

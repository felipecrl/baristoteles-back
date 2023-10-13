import UserToken from '@modules/users/infra/typeorm/entities/UserToken'

export interface IUserTokenRepository {
  findByToken(token: string): Promise<UserToken | null>
  generate(user_id: string): Promise<UserToken>
}

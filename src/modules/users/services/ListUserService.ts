import { inject, injectable } from 'tsyringe'

import { IPaginateUser } from '@modules/users/domain/models'
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository'

interface SearchParams {
  page: number
  limit: number
}

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<IPaginateUser> {
    const take = limit
    const skip = (Number(page) - 1) * take

    const users = await this.usersRepository.findAll({
      page,
      skip,
      take
    })

    return users
  }
}

export default ListUserService

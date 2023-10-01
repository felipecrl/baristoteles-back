import { getCustomRepository } from 'typeorm'

import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository'
import User from '@modules/users/typeorm/entities/Users'

interface IPaginateUsers {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: number | null
  next_page: number | null
  data: User[]
}

class ListUserService {
  public async execute(): Promise<IPaginateUsers> {
    const usersRepository = getCustomRepository(UsersRepository)

    const users = await usersRepository.createQueryBuilder().paginate()

    return users as IPaginateUsers
  }
}

export default ListUserService

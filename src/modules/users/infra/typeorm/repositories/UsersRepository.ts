import { Repository } from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/Users'
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository'
import { ICreateUser, IPaginateUser } from '@modules/users/domain/models'

import { dataSource } from '@shared/infra/typeorm'

type SearchParams = {
  page: number
  skip: number
  take: number
}

class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = dataSource.getRepository(User)
  }

  public async create({
    name,
    email,
    password,
    roles
  }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      roles
    })

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user)

    return user
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user)
  }

  public async findAll({
    page,
    skip,
    take
  }: SearchParams): Promise<IPaginateUser> {
    const [users, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount()

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users
    }

    return result
  }

  public async findByName(name: string): Promise<User | null> {
    const user = this.ormRepository.findOneBy({
      name
    })

    return user
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.ormRepository.findOneBy({
      id
    })

    return user
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.ormRepository.findOneBy({
      email
    })

    return user
  }
}

export default UserRepository

import { getRepository, Repository } from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/Users'
import { IUsersRepository } from '@modules/users/domain/repositopries/IUsersRepository'
import { ICreateUser, IPaginateUser } from '@modules/users/domain/models'

type SearchParams = {
  page: number
  skip: number
  take: number
}

class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password
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

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        name
      }
    })

    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        id
      }
    })

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        email
      }
    })

    return user
  }
}

export default UserRepository

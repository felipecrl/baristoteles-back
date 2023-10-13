import { v4 as uuidv4 } from 'uuid'
import { ICreateUser, IPaginateUser, IUser } from '@modules/users/domain/models'
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/Users'

type SearchParams = {
  page: number
  skip: number
  take: number
}

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User()

    user.id = uuidv4()
    user.name = name
    user.email = email
    user.password = password

    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    )

    this.users[findIndex] = user

    return user
  }

  public async remove(user: User): Promise<void> {}

  public async findAll({
    page,
    skip,
    take
  }: SearchParams): Promise<IPaginateUser> {
    const result = {
      per_page: take,
      total: 10,
      current_page: page,
      data: []
    }

    return result
  }

  public async findByName(name: string): Promise<IUser | null> {
    const user = this.users.find((user) => user.name === name)
    return user
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = this.users.find((user) => user.id === id)
    return user
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find((user) => user.email === email)
    return user
  }
}

export default FakeUsersRepository

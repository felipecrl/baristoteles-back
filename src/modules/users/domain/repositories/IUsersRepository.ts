import { ICreateUser, IPaginateUser, IUser } from '@modules/users/domain/models'

type SearchParams = {
  page: number
  skip: number
  take: number
}

export interface IUsersRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateUser>
  findByName(name: string): Promise<IUser | null>
  findById(id: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
  create(data: ICreateUser): Promise<IUser>
  save(user: IUser): Promise<IUser>
  remove(user: IUser): Promise<void>
}

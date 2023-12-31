import { ICreatePub, IPub, IPubPaginate } from '@modules/pubs/domain/models'

type SearchParams = {
  page: number
  skip: number
  take: number
}

export interface IPubsRepository {
  findByName(name: string): Promise<IPub | null>
  findById(id: string): Promise<IPub | null>
  findAll({ page, skip, take }: SearchParams): Promise<IPubPaginate>
  create(data: ICreatePub): Promise<IPub>
  save(pub: IPub): Promise<IPub>
  remove(pub: IPub): Promise<void>
}

import { v4 as uuidv4 } from 'uuid'

import { ICreatePub, IPubPaginate } from '@modules/pubs/domain/models'
import { IPubsRepository } from '@modules/pubs/domain/repositories/IPubsRepository'
import Pub from '@modules/pubs/infra/typeorm/entities/Pubs'

type SearchParams = {
  page: number
  skip: number
  take: number
}

class FakePubRepository implements IPubsRepository {
  private pubs: Pub[] = []

  public async create({
    name,
    address,
    number,
    neighborhood,
    instagram,
    recommendation
  }: ICreatePub): Promise<Pub> {
    const pub = new Pub()

    pub.id = uuidv4()
    pub.name = name
    pub.address = address
    pub.number = number
    pub.neighborhood = neighborhood
    pub.instagram = instagram
    pub.recommendation = recommendation

    this.pubs.push(pub)

    return pub
  }

  public async save(pub: Pub): Promise<Pub> {
    const findIndex = this.pubs.findIndex((findPub) => findPub.id === pub.id)

    this.pubs[findIndex] = pub

    return pub
  }

  public async remove(pub: Pub): Promise<void> {}

  public async findByName(name: string): Promise<Pub | undefined> {
    const pub = this.pubs.find((pub) => pub.name === name)
    return pub
  }

  public async findById(id: string): Promise<Pub | undefined> {
    const pub = this.pubs.find((pub) => pub.id === id)
    return pub
  }

  public async findAll({
    page,
    skip,
    take
  }: SearchParams): Promise<IPubPaginate> {
    const result = {
      per_page: take,
      total: 10,
      current_page: page,
      data: []
    }

    return result
  }
}

export default FakePubRepository

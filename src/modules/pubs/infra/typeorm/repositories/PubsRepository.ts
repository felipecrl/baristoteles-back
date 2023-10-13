import { Repository } from 'typeorm'

import { ICreatePub, IPubPaginate } from '@modules/pubs/domain/models'
import { IPubsRepository } from '@modules/pubs/domain/repositories/IPubsRepository'
import Pub from '@modules/pubs/infra/typeorm/entities/Pubs'

import { dataSource } from '@shared/infra/typeorm'

type SearchParams = {
  page: number
  skip: number
  take: number
}

class PubRepository implements IPubsRepository {
  private ormRepository: Repository<Pub>

  constructor() {
    this.ormRepository = dataSource.getRepository(Pub)
  }

  public async create({
    name,
    address,
    number,
    neighborhood,
    instagram,
    recommendation
  }: ICreatePub): Promise<Pub> {
    const pub = this.ormRepository.create({
      name,
      address,
      number,
      neighborhood,
      instagram,
      recommendation
    })

    await this.ormRepository.save(pub)

    return pub
  }

  public async save(pub: Pub): Promise<Pub> {
    await this.ormRepository.save(pub)

    return pub
  }

  public async remove(pub: Pub): Promise<void> {
    await this.ormRepository.remove(pub)
  }

  public async findByName(name: string): Promise<Pub | null> {
    const pub = this.ormRepository.findOneBy({
      name
    })

    return pub
  }

  public async findById(id: string): Promise<Pub | null> {
    const pub = this.ormRepository.findOneBy({
      id
    })

    return pub
  }

  public async findAll({
    page,
    skip,
    take
  }: SearchParams): Promise<IPubPaginate> {
    const [pubs, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount()

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: pubs
    }

    return result
  }
}

export default PubRepository

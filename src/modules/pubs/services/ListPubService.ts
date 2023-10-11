/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'tsyringe'

import { IPaginatePubs } from '@modules/pubs/domain/models'
import { IPubsRepository } from '@modules/pubs/domain/repositories/IPubsRepository'

import redisCache from '@shared/cache/RedisCache'

interface SearchParams {
  page: number
  limit: number
}

@injectable()
class ListPubService {
  constructor(
    @inject('PubRepository')
    private pubsRepository: IPubsRepository
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<IPaginatePubs> {
    const take = limit
    const skip = (Number(page) - 1) * take

    let pubs = await redisCache.recover<any>('api-baristoteles-PUB_LIST')

    if (!pubs) {
      pubs = await this.pubsRepository.findAll({
        page,
        skip,
        take
      })

      await redisCache.save('api-baristoteles-PUB_LIST', pubs)
    }

    return pubs
  }
}

export default ListPubService

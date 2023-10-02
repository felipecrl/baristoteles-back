/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCustomRepository } from 'typeorm'

import PubRepository from '@modules/pubs/typeorm/repositories/PubsRepository'
import Pub from '@modules/pubs/typeorm/entities/Pubs'

import redisCache from '@shared/cache/RedisCache'

interface IPaginatePubs {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: number | null
  next_page: number | null
  data: Pub[]
}

class ListPubService {
  public async execute(): Promise<IPaginatePubs> {
    const pubsRepository = getCustomRepository(PubRepository)

    let pubs = await redisCache.recover<any>('api-baristoteles-PUB_LIST')

    if (!pubs) {
      pubs = await pubsRepository.createQueryBuilder().paginate()

      await redisCache.save('api-baristoteles-PUB_LIST', pubs)
    }

    return pubs as IPaginatePubs
  }
}

export default ListPubService

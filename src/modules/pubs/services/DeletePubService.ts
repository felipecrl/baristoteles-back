import { getCustomRepository } from 'typeorm'

import PubRepository from '@modules/pubs/typeorm/repositories/PubsRepository'

import AppError from '@shared/errors/AppError'
import redisCache from '@shared/cache/RedisCache'

interface IRequest {
  id: string
}

class DeletePubService {
  public async execute({ id }: IRequest): Promise<void> {
    const pubsRepository = getCustomRepository(PubRepository)

    const pub = await pubsRepository.findOne(id)

    if (!pub) {
      throw new AppError('Pub not found')
    }

    await redisCache.invalidate('api-baristoteles-PUB_LIST')

    await pubsRepository.remove(pub)
  }
}

export default DeletePubService

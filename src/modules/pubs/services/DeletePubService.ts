import { inject, injectable } from 'tsyringe'

import { IDeletePub } from '@modules/pubs/domain/models'
import { IPubsRepository } from '@modules/pubs/domain/repositories/IPubsRepository'

import AppError from '@shared/errors/AppError'
import redisCache from '@shared/cache/RedisCache'

@injectable()
class DeletePubService {
  constructor(
    @inject('PubRepository')
    private pubsRepository: IPubsRepository
  ) {}

  public async execute({ id }: IDeletePub): Promise<void> {
    const pub = await this.pubsRepository.findById(id)

    if (!pub) {
      throw new AppError('Pub not found')
    }

    await redisCache.invalidate('api-baristoteles-PUB_LIST')

    await this.pubsRepository.remove(pub)
  }
}

export default DeletePubService

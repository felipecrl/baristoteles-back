import { inject, injectable } from 'tsyringe'

import { IPub, IUpdatePub } from '@modules/pubs/domain/models'
import { IPubsRepository } from '@modules/pubs/domain/repositories/IPubsRepository'

import AppError from '@shared/errors/AppError'
import redisCache from '@shared/cache/RedisCache'

@injectable()
class UpdatePubService {
  constructor(
    @inject('PubRepository')
    private pubsRepository: IPubsRepository
  ) {}

  public async execute({
    id,
    name,
    address,
    number,
    neighborhood,
    instagram,
    recommendation,
    date
  }: IUpdatePub): Promise<IPub> {
    const pub = await this.pubsRepository.findById(id)

    if (!pub) {
      throw new AppError('Pub not found!')
    }

    const pubExists = await this.pubsRepository.findByName(name)

    if (pubExists && name !== pub.name) {
      throw new AppError('There are a pub with this name')
    }

    await redisCache.invalidate('api-baristoteles-PUB_LIST')

    pub.name = name
    pub.address = address
    pub.number = number
    pub.neighborhood = neighborhood
    pub.instagram = instagram
    pub.recommendation = recommendation
    pub.date = date

    await this.pubsRepository.save(pub)

    return pub
  }
}

export default UpdatePubService

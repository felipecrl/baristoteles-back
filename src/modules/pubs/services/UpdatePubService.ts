import { getCustomRepository } from 'typeorm'

import PubRepository from '@modules/pubs/typeorm/repositories/PubsRepository'
import Pub from '@modules/pubs/typeorm/entities/Pubs'

import AppError from '@shared/errors/AppError'
import RedisCache from '@shared/cache/RedisCache'

interface IRequest {
  id: string
  name: string
  address: string
  number: string
  neighborhood: string
  instagram: string
  recommendation: string
}

class UpdatePubService {
  public async execute({
    id,
    name,
    address,
    number,
    neighborhood,
    instagram,
    recommendation
  }: IRequest): Promise<Pub> {
    const pubsRepository = getCustomRepository(PubRepository)

    const pub = await pubsRepository.findOne(id)

    if (!pub) {
      throw new AppError('Pub not found!')
    }

    const pubExists = await pubsRepository.findByName(name)

    if (pubExists && name !== pub.name) {
      throw new AppError('There are a pub with this name')
    }

    const redisCache = new RedisCache()

    await redisCache.invalidate('api-baristoteles-PUB_LIST')

    pub.name = name
    pub.address = address
    pub.number = number
    pub.neighborhood = neighborhood
    pub.instagram = instagram
    pub.recommendation = recommendation

    await pubsRepository.save(pub)

    return pub
  }
}

export default UpdatePubService

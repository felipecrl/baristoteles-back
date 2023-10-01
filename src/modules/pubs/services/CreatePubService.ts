import { getCustomRepository } from 'typeorm'

import PubRepository from '@modules/pubs/typeorm/repositories/PubsRepository'
import Pub from '@modules/pubs/typeorm/entities/Pubs'

import AppError from '@shared/errors/AppError'
import RedisCache from '@shared/cache/RedisCache'

interface IRequest {
  name: string
  address: string
  number: string
  neighborhood: string
  instagram: string
  recommendation: string
}

class CreatePubService {
  public async execute({
    name,
    address,
    number,
    neighborhood,
    instagram,
    recommendation
  }: IRequest): Promise<Pub> {
    const pubsRepository = getCustomRepository(PubRepository)

    const pubExists = await pubsRepository.findByName(name)

    if (pubExists) {
      throw new AppError('There is already one pub whit this name.')
    }

    const redisCache = new RedisCache()

    const pub = pubsRepository.create({
      name,
      address,
      number,
      neighborhood,
      instagram,
      recommendation
    })

    await redisCache.invalidate('api-baristoteles-PUB_LIST')

    await pubsRepository.save(pub)

    return pub
  }
}

export default CreatePubService

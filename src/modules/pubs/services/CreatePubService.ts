import { inject, injectable } from 'tsyringe'

import { ICreatePub, IPub } from '@modules/pubs/domain/models'
import { IPubsRepository } from '@modules/pubs/domain/repositories/IPubsRepository'

import AppError from '@shared/errors/AppError'
import redisCache from '@shared/cache/RedisCache'

@injectable()
class CreatePubService {
  constructor(
    @inject('PubRepository')
    private pubsRepository: IPubsRepository
  ) {}

  public async execute({
    name,
    address,
    number,
    neighborhood,
    instagram,
    recommendation,
    date
  }: ICreatePub): Promise<IPub> {
    const pubExists = await this.pubsRepository.findByName(name)

    if (pubExists) {
      throw new AppError('There is already one pub whit this name.')
    }

    const pub = await this.pubsRepository.create({
      name,
      address,
      number,
      neighborhood,
      instagram,
      recommendation,
      date
    })

    await redisCache.invalidate('api-baristoteles-PUB_LIST')

    return pub
  }
}

export default CreatePubService

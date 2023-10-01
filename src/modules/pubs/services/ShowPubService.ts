import { getCustomRepository } from 'typeorm'

import PubRepository from '@modules/pubs/typeorm/repositories/PubsRepository'
import Pub from '@modules/pubs/typeorm/entities/Pubs'

import AppError from '@shared/errors/AppError'

interface IRequest {
  id: string
}

class ShowPubService {
  public async execute({ id }: IRequest): Promise<Pub> {
    const pubsRepository = getCustomRepository(PubRepository)

    const pub = await pubsRepository.findOne(id)

    if (!pub) {
      throw new AppError('Pub not found')
    }

    return pub
  }
}

export default ShowPubService

import { inject, injectable } from 'tsyringe'

import { IPub, IShowPub } from '@modules/pubs/domain/models'
import { IPubsRepository } from '@modules/pubs/domain/repositories/IPubsRepository'

import AppError from '@shared/errors/AppError'

@injectable()
class ShowPubService {
  constructor(
    @inject('PubRepository')
    private pubsRepository: IPubsRepository
  ) {}

  public async execute({ id }: IShowPub): Promise<IPub> {
    const pub = await this.pubsRepository.findById(id)

    if (!pub) {
      throw new AppError('Pub not found')
    }

    return pub
  }
}

export default ShowPubService

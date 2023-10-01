import { EntityRepository, Repository } from 'typeorm'

import Pub from '@modules/pubs/typeorm/entities/Pubs'

@EntityRepository(Pub)
class PubRepository extends Repository<Pub> {
  public async findByName(name: string): Promise<Pub | undefined> {
    const pub = this.findOne({
      where: {
        name
      }
    })

    return pub
  }
}

export default PubRepository

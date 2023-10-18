import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Expose } from 'class-transformer'

import { IPub } from '@modules/pubs/domain/models'

@Entity('pubs')
class Pub implements IPub {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  address: string

  @Column()
  number: string

  @Column()
  neighborhood: string

  @Column()
  instagram: string

  @Column()
  recommendation: string

  @Column()
  cover: string

  @Column()
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'cover_url' })
  getCoverUrl(): string | null {
    if (!this.cover) {
      return null
    }

    return `${process.env.APP_API_URL}/files/${this.cover}`
  }
}

export default Pub

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
// import { Expose } from 'class-transformer'

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
  avatar: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // @Expose({ name: 'avatar_url' })
  // getAvatarUrl(): string | null {
  //   if (!this.avatar) {
  //     return null
  //   }

  //   return `${process.env.APP_API_URL}/files/${this.avatar}`
  // }
}

export default Pub

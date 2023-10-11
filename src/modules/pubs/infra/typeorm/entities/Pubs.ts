import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

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

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Pub

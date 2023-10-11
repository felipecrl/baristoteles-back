import Pub from '@modules/pubs/infra/typeorm/entities/Pubs'

export interface IPub {
  id: string
  name: string
  address: string
  number: string
  neighborhood: string
  instagram: string
  recommendation: string
  created_at: Date
  updated_at: Date
}

export interface ICreatePub {
  name: string
  address: string
  number: string
  neighborhood: string
  instagram: string
  recommendation: string
}

export interface IDeletePub {
  id: string
}

export interface IPaginatePubs {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: number | null
  next_page: number | null
  data: Pub[]
}

export interface IShowPub {
  id: string
}

export interface IUpdatePub {
  id: string
  name: string
  address: string
  number: string
  neighborhood: string
  instagram: string
  recommendation: string
}

export interface IPubPaginate {
  per_page: number
  total: number
  current_page: number
  data: IPub[]
}

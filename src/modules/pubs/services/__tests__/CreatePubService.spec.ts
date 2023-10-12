import 'reflect-metadata'
import CreatePubService from '@modules/pubs/services/CreatePubService'
import FakePubRepository from '@modules/pubs/domain/repositories/fakes/FakePubsRepository'
import AppError from '@shared/errors/AppError'

let fakePubRepository: FakePubRepository
let createPubService: CreatePubService

describe('CreatePub', () => {
  beforeEach(() => {
    fakePubRepository = new FakePubRepository()
    createPubService = new CreatePubService(fakePubRepository)
  })

  it('should be able to create a new pub', async () => {
    const pub = await createPubService.execute({
      name: 'Bar do Felipe',
      address: 'Rua teste',
      number: '12',
      neighborhood: 'Teste',
      instagram: 'http://instagram.com/test',
      recommendation: 'Felipe'
    })

    expect(pub).toHaveProperty('id')
  })

  it('should not be able to create two pubs with the same email', async () => {
    await createPubService.execute({
      name: 'Bar do Felipe',
      address: 'Rua teste',
      number: '12',
      neighborhood: 'Teste',
      instagram: 'http://instagram.com/test',
      recommendation: 'Felipe'
    })

    expect(
      createPubService.execute({
        name: 'Bar do Felipe',
        address: 'Rua teste',
        number: '12',
        neighborhood: 'Teste',
        instagram: 'http://instagram.com/test',
        recommendation: 'Felipe'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})

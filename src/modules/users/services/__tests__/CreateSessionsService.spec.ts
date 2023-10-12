import 'reflect-metadata'

import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository'
import FakeBcryptHashProvider from '@modules/users/providers/HashProvider/fakes/FakeBcryptHashProvider'
import CreateSessionsService from '@modules/users/services/CreateSessionsService'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let createSession: CreateSessionsService
let fakeHashProvider: FakeBcryptHashProvider

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeBcryptHashProvider()
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Felipe',
      email: 'felipe@felipe.com',
      password: '123456'
    })

    const response = await createSession.execute({
      email: 'felipe@felipe.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with non existent user', async () => {
    expect(
      createSession.execute({
        email: 'felipe@felipe.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Felipe',
      email: 'felipe@felipe.com',
      password: '123456'
    })

    expect(
      createSession.execute({
        email: 'felipe@felipe.com',
        password: '567890'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})

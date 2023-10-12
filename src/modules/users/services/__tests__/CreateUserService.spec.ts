import 'reflect-metadata'
import CreateUserService from '@modules/users/services/CreateUserService'
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository'
import FakeBcryptHashProvider from '@modules/users/providers/HashProvider/fakes/FakeBcryptHashProvider'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let createUser: CreateUserService
let fakeHashProvider: FakeBcryptHashProvider

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeBcryptHashProvider()
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Felipe',
      email: 'felipe@felipe.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'Felipe',
      email: 'felipe@felipe.com',
      password: '123456'
    })

    expect(
      createUser.execute({
        name: 'Felipe',
        email: 'felipe@felipe.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})

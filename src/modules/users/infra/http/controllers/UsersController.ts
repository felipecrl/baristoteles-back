import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { container } from 'tsyringe'

import ListUserService from '@modules/users/services/ListUserService'
import CreateUserService from '@modules/users/services/CreateUserService'
import DeleteUserService from '@modules/users/services/DeleteUserService'

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1
    const limit = request.query.limit ? Number(request.query.limit) : 15
    const listUsers = container.resolve(ListUserService)

    const users = await listUsers.execute({ page, limit })

    return response.json(instanceToInstance(users))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
      password
    })

    return response.json(instanceToInstance(user))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteUser = container.resolve(DeleteUserService)

    await deleteUser.execute({ id })

    return response.json([])
  }
}

export default UsersController

import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'

import ListUserService from '@modules/users/services/ListUserService'
import CreateUserService from '@modules/users/services/CreateUserService'
import DeleteUserService from '@modules/users/services/DeleteUserService'

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService()

    const users = await listUsers.execute()

    return response.json(instanceToInstance(users))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password
    })

    return response.json(instanceToInstance(user))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteUser = new DeleteUserService()

    await deleteUser.execute({ id })

    return response.json([])
  }
}

export default UsersController

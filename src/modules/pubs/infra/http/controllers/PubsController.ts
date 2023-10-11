import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListPubService from '@modules/pubs/services/ListPubService'
import ShowPubService from '@modules/pubs/services/ShowPubService'
import CreatePubService from '@modules/pubs/services/CreatePubService'
import UpdatePubService from '@modules/pubs/services/UpdatePubService'
import DeletePubService from '@modules/pubs/services/DeletePubService'

class PubsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1
    const limit = request.query.limit ? Number(request.query.limit) : 15
    const listPubs = container.resolve(ListPubService)

    const pubs = await listPubs.execute({ page, limit })

    return response.json(pubs)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showPub = container.resolve(ShowPubService)

    const pub = await showPub.execute({ id })

    return response.json(pub)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, address, number, neighborhood, instagram, recommendation } =
      request.body

    const createPub = container.resolve(CreatePubService)

    const pub = await createPub.execute({
      name,
      address,
      number,
      neighborhood,
      instagram,
      recommendation
    })

    return response.json(pub)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, address, number, neighborhood, instagram, recommendation } =
      request.body

    const updatePub = container.resolve(UpdatePubService)

    const pub = await updatePub.execute({
      id,
      name,
      address,
      number,
      neighborhood,
      instagram,
      recommendation
    })

    return response.json(pub)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deletePub = container.resolve(DeletePubService)

    await deletePub.execute({ id })

    return response.json([])
  }
}

export default PubsController

import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import PubsController from '@modules/pubs/controllers/PubsController'
import isAythenticated from '@shared/http/middlewares/isAuthenticated'

const pubsRouter = Router()
const pubsController = new PubsController()

pubsRouter.use(isAythenticated)

pubsRouter.get('/', pubsController.index)

pubsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  pubsController.show
)

pubsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      address: Joi.string().required(),
      number: Joi.string().required(),
      neighborhood: Joi.string().required(),
      instagram: Joi.string().required(),
      recommendation: Joi.string().required()
    }
  }),
  pubsController.create
)

pubsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      address: Joi.string().required(),
      number: Joi.string().required(),
      neighborhood: Joi.string().required(),
      instagram: Joi.string().required(),
      recommendation: Joi.string().required()
    }
  }),
  pubsController.update
)

pubsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  pubsController.delete
)

export default pubsRouter

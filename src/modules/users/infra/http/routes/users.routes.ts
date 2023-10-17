import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import multer from 'multer'

import uploadConfig from '@config/upload'

import UsersController from '@modules/users/infra/http/controllers/UsersController'
import isAythenticated from '@shared/infra/http/middlewares/isAuthenticated'
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController'

const usersRouter = Router()
const usersController = new UsersController()
const usersAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.multer)

usersRouter.get('/', isAythenticated, usersController.index)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      roles: Joi.string().required()
    }
  }),
  usersController.create
)

usersRouter.patch(
  '/avatar',
  isAythenticated,
  upload.single('avatar'),
  usersAvatarController.update
)

usersRouter.delete(
  '/:id',
  isAythenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  usersController.delete
)

export default usersRouter

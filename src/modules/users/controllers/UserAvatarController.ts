import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import AppError from '@shared/errors/AppError'

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService()

    if (!request.file) {
      throw new AppError("File doesn't existis.")
    }

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json(instanceToInstance(user))
  }
}

export default UserAvatarController

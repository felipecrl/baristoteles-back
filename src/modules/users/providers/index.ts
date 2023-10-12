import { container } from 'tsyringe'

import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider'
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider'

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider)

import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider'

class FakeBcryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload
  }

  public async comparehash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed
  }
}

export default FakeBcryptHashProvider

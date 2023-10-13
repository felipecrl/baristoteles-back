import 'reflect-metadata'
import 'dotenv/config'

import { app } from '@shared/infra/http/app'
import { dataSource } from '@shared/infra/typeorm'

dataSource.initialize().then(() => {
  app.listen(process.env.PORT || 3333, () => {
    console.log('Server started on port 3333! 🏆')
  })
})

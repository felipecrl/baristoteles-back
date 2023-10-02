import nodemailer from 'nodemailer'
import { SES, SendRawEmailCommand } from '@aws-sdk/client-ses'

import mailConfig from '@config/mail/mail'

import HandlebarsMailTemplate from '@config/mail/HandlebarsMailTemplate'

interface IMailContact {
  name: string
  email: string
}

interface ITemplateVariable {
  [key: string]: string | number
}

interface IParseMailTemplate {
  file: string
  variables: ITemplateVariable
}

interface ISendMail {
  to: IMailContact
  from?: IMailContact
  subject: string
  templateData: IParseMailTemplate
}

export default class SESMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate()

    const ses = new SES()

    const transporter = nodemailer.createTransport({
      SES: {
        ses: ses,
        aws: { SendRawEmailCommand }
      }
    })

    const { email, name } = mailConfig.defaults.from

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parse(templateData)
    })
  }
}

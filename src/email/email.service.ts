import { Injectable } from '@nestjs/common'
import { type SendUserConfirmationDto } from './dto/send-email-confirmation.dto'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {
  constructor (
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  sendEmail (sendUserConfirmationDto: SendUserConfirmationDto) {
    const { email, name, token } = sendUserConfirmationDto
    const url = `${this.configService.get('FRONT_END_HOST')}/auth/confirm?token=${token}`
    const subject = `Welcome ${name}`

    this.mailerService.sendMail({
      to: email,
      subject,
      template: './confirmation',
      context: { name, url }
    })
  }
}

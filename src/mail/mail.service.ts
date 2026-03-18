import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailService {
  private transporter: Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: configService.get<string>('MAIL_HOST') ?? '',
      port: configService.get<number>('MAIL_PORT') ?? 587,
      secure: false,
      tls: { rejectUnauthorized: false },
      auth: {
        user: configService.get<string>('MAIL_USER'),
        pass: configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendMail(dto: SendMailDto) {
    const { recipients, subject, html, text } = dto;
    const options: SendMailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: recipients,
      subject,
      html,
      text,
    };
    try {
      const info = await this.transporter.sendMail(options);

      console.log(info, text);
    } catch (err: unknown) {
      throw new InternalServerErrorException(
        `Não foi possível enviar email: ${err instanceof Error && err.message}`,
      );
    }
    return { message: 'Receberá um email se existir' };
  }
}

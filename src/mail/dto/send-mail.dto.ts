import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @IsNotEmpty()
  @IsEmail(undefined, { each: true })
  recipients: string[];

  @IsString()
  subject: string;

  @IsString()
  @IsOptional()
  html?: string;

  @IsString()
  @IsOptional()
  text?: string;
}

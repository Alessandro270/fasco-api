import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email do usuário para recuperação de senha',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}

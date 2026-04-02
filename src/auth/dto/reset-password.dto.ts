import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'Token de recuperação gerado após validação do OTP',
    description: 'Token de recuperação para redefinir a senha',
  })
  @IsString()
  @IsNotEmpty()
  resetToken: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'Nova senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'Confirmação da nova senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPasswordConfirm: string;
}

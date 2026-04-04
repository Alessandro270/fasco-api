import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'Primeiro nome do usuario' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Doe', description: 'Sobrenome do usuario' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email do usuario',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Senha do usuario' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  // @ApiProperty({ example: 'John', description: 'Primeiro nome do usuario' })
  // @IsEnum(Role)
  // role:Role
}

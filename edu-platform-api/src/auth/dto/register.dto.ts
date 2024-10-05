import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
    default: 'user@example.com', 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password for the user',
    default: 'password123',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    default: 'John Doe', 
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: Role.USER,
    enum: Role,
    description: 'The role of the user',
    default: Role.USER,
    required: false,
  })
  @IsEnum(Role)
  role?: Role;
}

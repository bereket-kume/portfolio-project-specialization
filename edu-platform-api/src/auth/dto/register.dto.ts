import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator'
import { UserRole } from '@prisma/client'

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string

    @IsEnum(UserRole)
    role: UserRole
}
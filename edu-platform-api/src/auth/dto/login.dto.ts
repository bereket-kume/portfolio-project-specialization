import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'The email address of the user',
        example: 'user@example.com',
        default: 'user@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'yourPassword123',
        default: 'yourPassword123',  
    })
    @IsNotEmpty()
    password: string;
}

import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser } from './guards/auth.decorator';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User as PrismaUser } from '@prisma/client';

class JwtPayload {
  sub: string;
  email: string;
  role: string;
}

class LoginResponse {
  access_token: string;
  role: string;
}

class UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  premiumStatus: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ 
      status: 201, 
      description: 'User successfully registered',
      type: UserResponse 
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<PrismaUser> {
        return this.authService.register(registerDto);
    }
    
    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ 
      status: 200, 
      description: 'Successful login',
      type: LoginResponse
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
        return this.authService.login(loginDto);
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get current user information' })
    @ApiResponse({ 
      status: 200, 
      description: 'User information retrieved successfully',
      type: UserResponse
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async whoami(@GetUser() user: JwtPayload): Promise<PrismaUser | null> {
        return this.authService.whoami(user.sub);
    }
}


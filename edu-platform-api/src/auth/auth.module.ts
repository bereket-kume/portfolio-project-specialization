import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './guards/constants';

@Module({
  imports: [
   JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '2h'},
   }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}

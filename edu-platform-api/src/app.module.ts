import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { CommunityModule } from './community/community.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, 
    RedisModule, 
    UserModule, 
    AnnouncementsModule, 
    CommunityModule, 
    SubscriptionModule, EmailModule
  ],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}

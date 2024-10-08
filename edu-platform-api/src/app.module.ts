import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { CommunityModule } from './community/community.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [AuthModule, RedisModule, UserModule, PaymentModule, AnnouncementsModule, CommunityModule, SubscriptionModule],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}

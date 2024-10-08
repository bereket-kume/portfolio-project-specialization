import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  providers: [SubscriptionService],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {}

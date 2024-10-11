import { Module, MiddlewareConsumer } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { RawBodyMiddleware } from './raw-body.middleware';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [SubscriptionService, PrismaService],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(RawBodyMiddleware)
        .forRoutes('subscription/webhook');
}
}

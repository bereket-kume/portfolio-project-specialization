import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() body: { communityId: string, communityName: string, price: number }) {
    const { communityId, communityName, price } = body;
    
    if (!communityId || !communityName || !price) {
      throw new BadRequestException('Community ID, name, and price are required');
    }

    const sessionId = await this.subscriptionService.createCheckoutSession(communityId, communityName, price);
    return { sessionId };
  }
}

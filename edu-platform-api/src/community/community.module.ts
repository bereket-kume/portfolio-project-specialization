import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CommunityService, PrismaService],
  controllers: [CommunityController]
})
export class CommunityModule {}

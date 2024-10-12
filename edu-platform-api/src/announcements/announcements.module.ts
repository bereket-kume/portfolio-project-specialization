import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AnnouncementsService, PrismaService],
  controllers: [AnnouncementsController]
})
export class AnnouncementsModule {}

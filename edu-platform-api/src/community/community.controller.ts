import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { Req } from '@nestjs/common';

@Controller('community')
export class CommunityController {
    constructor(private readonly communityService: CommunityService) {}

    @Post('create')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.ADMIN)
    createCommunity(@Body()  createCommunityDto:CreateCommunityDto, @Req() req) {
        return this.communityService.createCommunity(createCommunityDto, req.user.id)
    }
}

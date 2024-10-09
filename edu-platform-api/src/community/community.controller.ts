import { Controller, Post, Body, UseGuards, Get, Param, Put, Delete, Req } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateCommunityDto } from './dto/updateCommunity.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/guards/auth.decorator';

@ApiTags("Community")
// @ApiBearerAuth()
@Controller('community')
// @UseGuards(AuthGuard)  
export class CommunityController {
    constructor(private readonly communityService: CommunityService) {}

    @Get()
    getAllCommunity() {
        return this.communityService.getAllCommunity();
    }

    @Get(':id')
    getCommunityByID(@Param('id') id: string) {
        return this.communityService.getAllCommunityByID(id);
    }

    @Get('premium')
    getPremiumCommunities() {
        return this.communityService.getCommunitiesByPremiumStatus(true);
    }

    @Get('free')
    getFreeCommunities() {
        return this.communityService.getCommunitiesByPremiumStatus(false);
    }

    @Post('create')
    createCommunity(@Body() createCommunityDto: CreateCommunityDto, @GetUser() user) {
        return this.communityService.createCommunity(createCommunityDto, user.sub);
    }

    @Put(':id')
    updateCommunity(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
        return this.communityService.updateCommunity(id, updateCommunityDto);
    }

    @Delete(':id')
    deleteCommunity(@Param('id') id: string) {
        return this.communityService.deleteCommunity(id);
    }

    @Post('join/:id')
    joinCommunity(@Param('id') id: string, @GetUser() user) {
        return this.communityService.joinCommunity(id, user.sub);
    }
}

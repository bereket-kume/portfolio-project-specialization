import { Controller, Get, Put, Post, Body, Param, Delete } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-annoucement.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/guards/auth.decorator';

@ApiTags('Announcements')
@Controller('announcements')
export class AnnouncementsController {
    constructor(private readonly annoucementService: AnnouncementsService) {}

    @Get()
    GetAllAnnouncements() {
        return this.annoucementService.getAnnouncements();
    }

    @Get('community/:communityId')
    getAnnouncementForCommunity(@Param('communityId') communityId: string) {
        return this.annoucementService.getAnnouncementForCommunity(communityId)
    }

    @Put(":announcementId")
    updateAnnouncements(@Param('announcementId') annoucementId: string, @GetUser() user, data: any) {
        return this.annoucementService.updateAnnouncement(annoucementId, user.sub, data)
    }

    @Delete(':announcementId')
    deleteAnnouncements(@Param('announcementId') annoucementId: string) {
        return this.annoucementService.deleteAnnouncements(annoucementId)
    }
   
    @Post('create')
    createAnnoucements(@Body() createAnnoucementsdto: CreateAnnouncementDto) {
        return this.annoucementService.createAnnouncements(createAnnoucementsdto)
    }

}

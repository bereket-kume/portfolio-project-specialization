import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-annoucement.dto';


@Injectable()
export class AnnouncementsService {
    constructor(private readonly prisma: PrismaService) {}
    async getAnnouncements() {
        return this.prisma.announcement.findMany();
    }

    async getAnnouncementForCommunity(communityId: string) {
        return this.prisma.announcement.findMany({
            where: {
                communityId: communityId
            }
        })
    }

    async updateAnnouncement(annoucementId: string, userId: string, @Body() data: any) {
        const annoucement = await this.prisma.announcement.findUnique({
            where: {
                id: annoucementId
            }
        });
        if (annoucement.creatorId === userId) {
            await this.prisma.announcement.update({
                where: {
                    id: annoucementId
                },
                data
            })
        }
       
    }

    async deleteAnnouncements(annoucementId: string) {
        return this.prisma.announcement.delete({
            where: {
                id: annoucementId
            }
        })
    }
    
    async createAnnouncements(createAnnoucementsdto: CreateAnnouncementDto) {
        const { content, communityId, creatorID } = createAnnoucementsdto;
        console.log(createAnnoucementsdto)
        if (!creatorID) {
          throw new Error("Creator ID must be provided.");
        }
      
        return this.prisma.announcement.create({
          data: {
            content: content,
            community: {
              connect: {
                id: communityId,
              }
            },
            creator: {
              connect: {
                id: creatorID, // Ensure this is valid
              }
            }
          }
        });
      }
      

}

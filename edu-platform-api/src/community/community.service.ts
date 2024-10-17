import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/updateCommunity.dto';
import { Community } from '@prisma/client';

@Injectable()
export class CommunityService {
    constructor(private readonly prisma: PrismaService) {}

    getAllCommunity() {
        return this.prisma.community.findMany();
    }

    async getAllCommunityByID(id: string) {
        const community = await this.prisma.community.findUnique({
            where: { id },
        });

        if (!community) {
            throw new NotFoundException(`Community with ID ${id} not found.`);
        }

        return community;
    }

    async getCommunityMembers(id: string) {
        const community = await this.prisma.community.findUnique({
            where: {id },
            include: { members: {
                select: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            } }
        })
    
        return community.members;
    }

    async createCommunity(createCommunityDto: CreateCommunityDto, creatorId: string) {
        return this.prisma.community.create({
            data: {
                name: createCommunityDto.name,
                description: createCommunityDto.description,
                isPremium: createCommunityDto.isPremium,
                price: createCommunityDto.price ?? null,
                creatorId,
            },
        });
    }

    async updateCommunity(id: string, updateCommunityDto: UpdateCommunityDto) {
        const updatedCommunity = await this.prisma.community.update({
            where: { id },
            data: {
                name: updateCommunityDto.name,
                description: updateCommunityDto.description,
                isPremium: updateCommunityDto.isPremium,
                price: updateCommunityDto.price ?? null,
            },
        });

        if (!updatedCommunity) {
            throw new NotFoundException(`Community with ID ${id} not found for update.`);
        }

        return updatedCommunity;
    }

    async deleteCommunity(id: string) {
        const community = await this.prisma.community.findUnique({ where: { id } });
        
        if (!community) {
          throw new Error('Community not found');
        }
      
        await this.prisma.announcement.deleteMany({
          where: { communityId: id },
        });
        await this.prisma.userCommunity.deleteMany({
            where: { communityId: id },
        });
        await this.prisma.community.delete({
          where: { id },
        });

      
        return { message: 'Community deleted successfully' };
      }
      
    async getCommunitiesByPremiumStatus(isPremium: boolean): Promise<Community[]> {
        return this.prisma.community.findMany({
            where: {
                isPremium,
            },
        });
    }

    async joinCommunity(communityId: string, userId: string) {
        const community = await this.prisma.community.findUnique({
            where: {id: communityId},
        })
        if (!community) {
            throw new NotFoundException('Community with this id is not found')
        }
        const user = await this.prisma.user.findUnique({
            where: {id: userId}
        })
        if (!user) {
            throw new NotFoundException("User with this id is not found")
        }
        const userCommunity = await this.prisma.userCommunity.findFirst({
            where: {
                userId,
                communityId,
            }
        })
        if (userCommunity) {
            throw new BadRequestException("User already joined this community")
        }

        

        await this.prisma.userCommunity.create({
            data: {
                userId,
                communityId
            }
        })
        return { message: "User joined community"}
           
    }

    
}

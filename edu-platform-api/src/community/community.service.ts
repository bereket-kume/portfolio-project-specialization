import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/updateCommunity.dto';
import { Community } from '@prisma/client';
import { identity } from 'rxjs';

@Injectable()
export class CommunityService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllCommunity() {
        return await this.prisma.community.findMany()
    }

    async getAllCommunityByID(id: string) {
        return this.prisma.community.findUnique({
            where: { id },
        })
    }


    async createCommunity(createCommunityDto: CreateCommunityDto, creatorId: string) {
        const community = await this.prisma.community.create({
            data: {
                name: createCommunityDto.name,
                description: createCommunityDto.description,
                isPremium: createCommunityDto.isPremium,
                price: createCommunityDto.price || null,
                creatorId: creatorId
            }
        });

        return community;
    }

    async updateCommunity(id: string, updateCommunityDto: UpdateCommunityDto) {
        const updatedCommunity = await this.prisma.community.update({
            where: { id },
            data: {
                name: updateCommunityDto.name,
                description: updateCommunityDto.description,
                isPremium: updateCommunityDto.isPremium,
                price: updateCommunityDto.price || null,
            },
        });
    
        return updatedCommunity;
    }

    async deleteCommunity(id: string) {
        await this.prisma.community.delete({
            where: { id },
        });
        return { message: "Community deleted successfully" }
    }

    async getCommunitiesByPremiumStatus(isPremium: boolean): Promise<Community[]> {
        return await this.prisma.community.findMany({
            where: {
                isPremium: isPremium,
            },
        });
    }
}



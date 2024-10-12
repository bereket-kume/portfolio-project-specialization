import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma, Community, UserCommunity } from '@prisma/client'



@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    // async getUserById(id: string): Promise<User> {
    //     return this.prisma.user.findUnique({
    //         where: { id}
    //     })
    // }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data
        });
    }

    async deleteUser(userId: string) {
        await this.prisma.userCommunity.deleteMany({
            where: {
                userId: userId,
            },
        });

        // Step 2: Delete all announcements created by the user
        await this.prisma.announcement.deleteMany({
            where: {
                creatorId: userId,
            },
        });

        // Step 3: Delete all payments made by the user
        await this.prisma.payment.deleteMany({
            where: {
                userId: userId,
            },
        });

        // Step 4: Delete the user
        await this.prisma.user.delete({
            where: {
                id: userId,
            },
        });
    }

    async getUserProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                createdCommunities: true, 
                joinedCommunities: {     
                    include: {
                        community: true,  
                    },
                },
                announcements: true,       
                payments: {                
                    include: {
                        community: true,
                    },
                },
            },
        });
    
        if (!user) {
            throw new NotFoundException("User Not Found");
        }
    
        return {
            
            name: user.name,
            email: user.email,
            role: user.role,
            premiumStatus: user.premiumStatus,
            createdCommunities: user.createdCommunities,
            joinedCommunities: user.joinedCommunities.map(jc => jc.community),
            announcements: user.announcements,
            payments: user.payments.map(p => ({
                amount: p.amount,
                status: p.status,
                community: p.community,
            })),
            createdAt: user.createdAt,
        };
    }
    
}

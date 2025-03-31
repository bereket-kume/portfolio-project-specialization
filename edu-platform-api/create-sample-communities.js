const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createSampleCommunities() {
    try {
        // Get the admin user
        const adminUser = await prisma.user.findUnique({
            where: { email: 'admin@connectspace.com' }
        });

        if (!adminUser) {
            console.error('Admin user not found');
            return;
        }

        // Sample communities data
        const communities = [
            {
                name: 'Tech Enthusiasts',
                description: 'A community for technology lovers, developers, and IT professionals to share knowledge and experiences.',
                isPremium: false,
                price: null,
                creatorId: adminUser.id
            },
            {
                name: 'Premium Business Network',
                description: 'Exclusive community for business professionals, entrepreneurs, and industry leaders to network and share insights.',
                isPremium: true,
                price: 29.99,
                creatorId: adminUser.id
            },
            {
                name: 'Creative Artists Hub',
                description: 'A vibrant community for artists, designers, and creative professionals to showcase their work and collaborate.',
                isPremium: true,
                price: 19.99,
                creatorId: adminUser.id
            }
        ];

        // Create communities
        for (const community of communities) {
            const createdCommunity = await prisma.community.create({
                data: community
            });
            console.log(`Created community: ${createdCommunity.name}`);
        }

        console.log('All sample communities created successfully!');
    } catch (error) {
        console.error('Error creating sample communities:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createSampleCommunities(); 
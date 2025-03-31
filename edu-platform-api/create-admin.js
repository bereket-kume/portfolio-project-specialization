const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdminUser() {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        const adminUser = await prisma.user.create({
            data: {
                name: 'Admin User',
                email: 'admin@connectspace.com',
                password: hashedPassword,
                role: 'ADMIN',
                premiumStatus: true
            }
        });
        
        console.log('Admin user created successfully:', adminUser);
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser(); 
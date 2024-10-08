import { Controller, Get, Post, Body, Param, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/auth/guards/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags("User Management")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() data: Prisma.UserCreateInput) {
        return this.userService.createUser(data);
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
        return this.userService.updateUser(id, data);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

    @Get('profile')
    getUserProfile(@GetUser() user) {
        return this.userService.getUserProfile(user.sub);
    }
}

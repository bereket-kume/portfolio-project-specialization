import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { APP_FILTER } from '@nestjs/core';


@ApiTags("User Management")
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() data: Prisma.UserCreateInput) {
        return this.userService.createUser(data)
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id)
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
        return this.userService.updateUser(id, data)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }
}

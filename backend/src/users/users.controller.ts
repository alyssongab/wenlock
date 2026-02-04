import { Body, Controller, Post } from '@nestjs/common';
import type { UserRequestDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Post()
    async create(@Body() data: UserRequestDto){
        return this.userService.create(data);
    }
}

import { Body, Controller, Get, Post, Query, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { UserRequestDto, PaginationQueryDto, PaginatedUserResponseDto, UserResponseDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Post()
    async create(@Body() data: UserRequestDto){
        return this.userService.create(data);
    }

    @Get()
    async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<PaginatedUserResponseDto> {
        const { page, limit, name } = paginationQuery;
        return this.userService.findAllPaginated(page, limit, name);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: UserRequestDto): Promise<UserResponseDto> {
        return this.userService.update(id, data);
    }

}

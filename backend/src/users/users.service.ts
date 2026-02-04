import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService){}

    async create(data: UserDto) {
        const usuario = await this.prisma.usuario.create({ data });
    }
}

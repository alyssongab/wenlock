import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserRequestDto, UserResponseDto } from './dto/users.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService){}

    async create(data: UserRequestDto): Promise<UserResponseDto> {
        const usuario = await this.prisma.usuario.create({ data });
        return this.userToResponse(usuario);
    }

    private userToResponse(userRequest: UserRequestDto): UserResponseDto{
        return {
            id: userRequest.id,
            nome: userRequest.nome,
            email: userRequest.email
        };
    }
}

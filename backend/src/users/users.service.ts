import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PaginatedUserResponseDto, UserRequestDto, UserResponseDto } from './dto/users.dto';
import { Prisma, Usuario } from 'generated/prisma/client';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService){}

    async create(data: UserRequestDto): Promise<UserResponseDto> {
        try {
            const usuario = await this.prisma.usuario.create({ data });
            return this.userToResponse(usuario);
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Email ou matrícula informados já existem');
                }
            }
            throw error;
        }
    }

    async findAllPaginated(page: number = 1, limit: number = 15, name?: string): Promise<PaginatedUserResponseDto> {
        const skip = (page - 1) * limit;

        const whereClause: Prisma.UsuarioWhereInput = name 
            ? { nome: { contains: name } } 
            : {};

        const [usuarios, total] = await this.prisma.$transaction([
            this.prisma.usuario.findMany({
                skip: skip,
                take: limit,
                where: whereClause,
            }),
            this.prisma.usuario.count({
                where: whereClause,
            }),
        ]);

        const data = usuarios.map(this.userToResponse);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                count: data.length,
                search: name ? { name } : undefined,
            }
        };
    }

    async findOne(id: number): Promise<UserResponseDto> {
        const user = await this.prisma.usuario.findUnique({
            where: { id: id },
        });

        if (!user) {
            throw new NotFoundException("Usuário não encontrado.");
        }

        return this.userToResponse(user);
    }

    async update(id: number, data: UserRequestDto): Promise<UserResponseDto> {

        const { id: dtoId, ...updateData } = data;

        try {
            const updatedUser = await this.prisma.usuario.update({
                where: { id },
                data: updateData,
            });
            return this.userToResponse(updatedUser);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
                }
                if (error.code === 'P2002') {
                    throw new ConflictException('Email ou matrícula informados já existem');
                }
            }
            throw error;
        }
    }
    
    async delete(id: number): Promise<void> {
        const user = await this.findOne(id);
        if(!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
        }
        await this.prisma.usuario.delete({
            where: { id: id }
        });
    }

    private userToResponse(userRequest: Usuario): UserResponseDto{
        return {
            id: userRequest.id,
            nome: userRequest.nome,
            email: userRequest.email,
            matricula: userRequest.matricula,
            createdAt: userRequest.created_at
        };
    }
}

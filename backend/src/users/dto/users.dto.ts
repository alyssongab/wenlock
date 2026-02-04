import { IsAlphanumeric, IsEmail, IsInt, IsString, MaxLength, MinLength, Min, Max, IsOptional, Matches } from "class-validator"
import { Type } from "class-transformer";
// transformar string pra numero

export class UserRequestDto  {
    
    @IsOptional()
    @IsInt({message: "ID Inválido"})
    id?: number;

    @IsString({message: "O nome deve ser texto"})
    @MaxLength(30, {message: "Máximo 30 caracteres"})
    @Matches(/^[a-zA-Z\s]+$/, { message: "Nome deve conter apenas letras e espaços" })
    nome: string;

    @IsInt({ message: "A matrícula deve ser um número inteiro" })
    @Min(1000, { message: "A matrícula deve ter no mínimo 4 dígitos" })
    @Max(9999999999, { message: "A matrícula deve ter no máximo 10 dígitos" })
    matricula: number;

    @IsEmail({}, {message: "Email inválido"})
    email: string;

    @IsAlphanumeric("pt-BR", {message: "Apenas caracteres alfanuméricos" })
    @MinLength(6, { message: "Mínimo 6 caracteres"})
    senha: string;
}

export class PaginationQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsString()
    name?: string;
}

export class UserResponseDto  {
    id: number;
    nome: string;
    matricula: number;
    email: string;
    senha: string;
    createdAt: Date;
    updatedAt: Date | null;
}

export class PaginatedUserResponseDto {
    data: UserResponseDto[];
    meta: {
        total: number;
        page: number;
        limit: number;
        count: number;
        search?: {
            name?: string;
        }
    }
}
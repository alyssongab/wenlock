import { IsAlphanumeric, IsEmail, IsInt, IsString, MaxLength, MinLength, Min, Max } from "class-validator"

export class UserRequestDto  {
    
    @IsInt({message: "ID Inválido"})
    id?: number

    @IsString({message: "O nome deve ser texto"})
    @MaxLength(30, {message: "Máximo 30 caracteres"})
    nome: string

    @IsInt({ message: "A matrícula deve ser um número inteiro" })
    @Min(1000, { message: "A matrícula deve ter no mínimo 4 dígitos" })
    @Max(9999999999, { message: "A matrícula deve ter no máximo 10 dígitos" })
    matricula: number

    @IsEmail({}, {message: "Email inválido"})
    email: string

    @IsAlphanumeric("pt-BR", {message: "Apenas caracteres alfanuméricos" })
    @MinLength(6, { message: "Mínimo 6 caracteres"})
    senha: string
}

export class UserResponseDto  {
    id: number
    nome: string
    email: string
}
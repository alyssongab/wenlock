export type UserRequestDto = {
    id?: number,
    nome: string,
    matricula: number,
    email: string,
    senha: string
}

export type UserResponseDto = {
    id: number,
    nome: string,
    email: string,
}
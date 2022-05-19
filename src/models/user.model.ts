export interface User {
    id: string,
    nombre: string,
    apellido: string,
    direccion: string,
    email: string
}

export interface CreateUserDTO extends Omit<User, 'id'>{}

export interface UpdateUserDTO extends Partial<User>{}


import { Role } from "./role.model";

export interface User {
    id: number,
    username: string,
    email: string,
    dateOfBirth: Date,
    gender: string,
    elo: number,
    role: Role
}
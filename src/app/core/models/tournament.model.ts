import { Category } from "./category.model"

export interface Tournament {
    id: number,
    name: string,
    place?: string,
    NbPlayers?: number,
    minPlayers: number,
    maxPlayers: number,
    categories?: Category[],
    minElo?: number,
    maxElo?: number,
    status?: number,
    currentRound?: number,
    endRegistration: Date,
    canRegister: boolean,
    isRegistered: boolean
}

export interface TournamentForm {
    name: string,
    place?: string,
    minPlayers: number,
    maxPlayers: number,
    minElo?: number,
    maxElo?: number,
    categoriesIds?: number[],
    womenOnly: boolean,
    endRegistration: Date,
}
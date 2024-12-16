import { Category } from "./category.model"
import { Game } from "./game.model"
import { User } from "./user.model"

export interface Tournament {
    id: number,
    name: string,
    place?: string,
    nbPlayers?: number,
    minPlayers: number,
    maxPlayers: number,
    categories?: Category[],
    minElo?: number,
    maxElo?: number,
    status?: number,
    currentRound?: number,
    endRegistration: Date,
    canRegister: boolean,
    isRegistered: boolean,
    players?: User[],
    games: Game[]
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

export enum TournamentStatus {
    waitingPlayers = 1,
    onGoing = 2,
    Terminated = 3
}
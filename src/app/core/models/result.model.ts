export interface Result {
    username: string,
    nbGames: number,
    wins: number,
    losses: number,
    draws: number,
    score: number
}

export enum Winner {
    notPlayed = 1,
    white = 2,
    black = 3,
    draw = 4
}
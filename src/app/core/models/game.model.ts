export interface Game {
    id: number,
    tournamentId: number,
    whiteId: number,
    whiteName?: string,
    blackId: number,
    blackName?: string
    round: number,
    winner: number
}
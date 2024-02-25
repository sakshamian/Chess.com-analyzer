import { createPositions } from "./helper";

export const initGameState = {
    position: [createPositions()],
    turn: 'w',
    candidateMoves: []
}
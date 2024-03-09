import { createPositions } from "./helper";

export const Status = {
    'ongoing': 'Ongoing',
    'promoting': 'Promoting',
    'white': 'White wins',
    'black': 'Black wins',
    'stalemate': 'Game draws due to stalemate',
    'insufficient': 'Game draws due to insufficient material',
}

export const initGameState = {
    position: [createPositions()],
    turn: 'w',
    candidateMoves: [],
    promotionSquare: null,
    status: Status.ongoing,
    castlingDirection: {
        'w': 'both',
        'b': 'both'
    }
}
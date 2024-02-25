import actionTypes from "./actionTypes";

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.NEW_MOVE: {
            let { turn, position } = state;

            turn = turn === 'b' ? 'w' : 'b';
            position = [
                ...position,
                action.payload.newPosition
            ]
            return {
                ...state,
                position,
                turn
            }
        }
        case actionTypes.GENERATE_CANDIDATE_MOVES: {
            return {
                ...state,
                candidateMoves: action.payload.candidateMoves
            }
        }
        case actionTypes.CLEAR_CANDIDATE_MOVES: {
            return {
                ...state,
                candidateMoves: []
            }
        }
        default: {
            return state
        }
    }
}
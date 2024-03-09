import { Status } from "../../constant";
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
        case actionTypes.PROMOTION_OPEN: {
            return {
                ...state,
                status: Status.promoting,
                promotionSquare: { ...action.payload },
            }
        }
        case actionTypes.PROMOTION_CLOSE: {
            return {
                ...state,
                status: Status.ongoing,
                promotionSquare: null,
            }
        }
        case actionTypes.CAN_CASTLE: {
            let { turn, castlingDirection } = state;
            castlingDirection[turn] = action.payload;
            return {
                ...state,
                castlingDirection
            }
        }
        case actionTypes.STALEMATE: {
            return {
                ...state,
                status: Status.stalemate
            }
        }
        case actionTypes.NEW_GAME: {
            return {
                ...action.payload
            }
        }
        case actionTypes.INSUFFICIENT_MATERIAL: {
            return {
                ...state,
                status: Status.insufficient
            }
        }
        default: {
            return state
        }
    }
}
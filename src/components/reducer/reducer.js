import { Status } from "../../constant";
import actionTypes from "./actionTypes";

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.NEW_MOVE: {
            let { turn, position, movesList } = state;

            position = [
                ...position,
                action.payload.newPosition
            ]

            movesList = [
                ...movesList,
                action.payload.newMove
            ]

            turn = turn === 'b' ? 'w' : 'b';

            return {
                ...state,
                movesList,
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
        case actionTypes.WIN: {
            return {
                ...state,
                status: action.payload === 'w' ? Status.white : Status.black
            }
        }
        case actionTypes.TAKE_BACK: {
            let { position, movesList, turn } = state;

            if (position.length > 1) {
                position = position.slice(0, position.length - 1);
                console.log(movesList[movesList.length - 1]);
                movesList = movesList.slice(0, movesList.length - 1);
                turn = turn === 'w' ? 'b' : 'w'
            }

            return {
                ...state,
                position,
                movesList,
                turn
            }
        }
        default: {
            return state
        }
    }
}
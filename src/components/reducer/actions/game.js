import { initGameState } from "../../../constant"
import actionTypes from "../actionTypes"

export const updateCastling = direction => {
    return {
        type: actionTypes.CAN_CASTLE,
        payload: direction
    }
}

export const detectStalemate = () => {
    return {
        type: actionTypes.STALEMATE
    }
}

export const setupNewGame = () => {
    return {
        type: actionTypes.NEW_GAME,
        payload: initGameState
    }
}

export const detectInsufficientMaterial = () => {
    return {
        type: actionTypes.INSUFFICIENT_MATERIAL
    }
}
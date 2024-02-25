import actionTypes from "../actionTypes";

export const makeNewMove = ({ newPosition }) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload: { newPosition }
    }
};

export const generateCandidateMoves = ({ candidateMoves }) => {
    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload: { candidateMoves }
    }
};

export const clearCandidates = () => {
    return {
        type: actionTypes.CLEAR_CANDIDATE_MOVES,
    }
};
import React from 'react'
import { useAppContext } from '../../context/Context';
import arbiter from '../arbiter/arbiter';
import { generateCandidateMoves } from '../reducer/actions/move';

const Piece = ({ rank, file, piece }) => {

    const { appState, dispatch } = useAppContext();
    const { turn, position, castlingDirection } = appState;
    const currentPosition = position[position.length - 1];
    const prevPosition = position[position.length - 2];

    const onDragStart = e => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', `${piece},${rank},${file}`);
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
        if (turn === piece[0]) {
            const candidateMoves = arbiter.getValidMoves({
                position: currentPosition,
                prevPosition,
                castlingDirection: castlingDirection[turn],
                piece,
                rank,
                file
            });
            dispatch(generateCandidateMoves({ candidateMoves }));
        }
    };

    const onDragEnd = (e) => {
        e.target.style.display = 'block';
    };
    return (
        <div
            className={`piece ${piece} p-${file}${rank}`}
            draggable={true}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            {/* {rank === 0 ? <div className={file % 2 === 0 ? 'file-names even' : 'file-names odd'}>{String.fromCharCode(file + 97)}</div> : <></>}
            {file === 0 ? <div className={rank % 2 === 0 ? 'rank-names even' : 'rank-names odd'}>{rank + 1}</div> : <></>} */}
        </div>
    )
}

export default Piece
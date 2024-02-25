import React, { useRef, useState } from 'react';
import './pieces.css';
import Piece from './Piece';
import { copyPosition } from '../../helper';
import { useAppContext } from '../../context/Context';
import { clearCandidates, makeNewMove } from '../reducer/actions/move';

const Pieces = () => {
    const ref = useRef();
    const { appState, dispatch } = useAppContext();

    const currentPosition = appState.position[appState.position.length - 1];

    const getDropPosition = e => {
        const { width, left, top } = ref.current.getBoundingClientRect();
        const size = width / 8;
        const y = Math.floor((e.clientX - left) / size);
        const x = 7 - Math.floor((e.clientY - top) / size);
        return { x, y };
    }

    const onDrop = e => {
        const newPosition = copyPosition(currentPosition);
        const { x, y } = getDropPosition(e);

        const [piece, rank, file] = e.dataTransfer.getData('text').split(',');

        if (appState.candidateMoves?.find(m => m[0] === x && m[1] === y)) {
            newPosition[Number(rank)][Number(file)] = '';
            newPosition[x][y] = piece;
            dispatch(makeNewMove({ newPosition }));
        }

        dispatch(clearCandidates());
    }

    return (
        <div
            ref={ref}
            className='pieces'
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
        >
            {currentPosition?.map((r, rank) =>
                r.map((f, file) =>
                    currentPosition[rank][file] ? <Piece key={rank + '-' + file} rank={rank} file={file} piece={currentPosition[rank][file]} /> : null
                )
            )}
        </div>


    )
}

export default Pieces;
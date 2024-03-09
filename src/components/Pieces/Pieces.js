import React, { useRef, useState } from 'react';
import './pieces.css';
import Piece from './Piece';
import { copyPosition } from '../../helper';
import { useAppContext } from '../../context/Context';
import { clearCandidates, makeNewMove } from '../reducer/actions/move';
import arbiter from '../arbiter/arbiter';
import { openPromotion } from '../reducer/actions/popup';
import { getCastleDirections } from '../arbiter/getMoves';
import { updateCastling } from '../reducer/actions/game';

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

    const openPromotionBox = ({ rank, file, x, y }) => {
        dispatch(openPromotion({
            rank: Number(rank),
            file: Number(file),
            x,
            y
        }));
    };

    const updateCastlingState = ({ piece, rank, file }) => {
        const direction = getCastleDirections({
            castleDirection: appState.castlingDirection,
            piece,
            rank,
            file
        });

        if (direction) {
            dispatch(updateCastling(direction));
        }
    };

    const move = (e) => {
        const { x, y } = getDropPosition(e);
        const [piece, rank, file] = e.dataTransfer.getData('text').split(',');

        if (appState.candidateMoves.find(m => m[0] === x && m[1] === y)) {
            if ((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)) {
                openPromotionBox({ rank, file, x, y });
                return;
            }
            if (piece.endsWith('r') || piece.endsWith('k')) {
                updateCastlingState({ piece, rank, file });
            }
            const newPosition = arbiter.performMove({
                position: currentPosition,
                piece, rank, file,
                x, y
            })
            dispatch(makeNewMove({ newPosition }));
        }

        dispatch(clearCandidates());
    };

    const onDrop = e => {
        e.preventDefault();
        move(e);
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
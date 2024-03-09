export const getRookMoves = ({ position, piece, rank, file }) => {
    const moves = [];
    const us = piece[0];
    const enemy = piece[0] === 'w' ? 'b' : 'w';

    const direction = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1]
    ]
    direction.forEach(dir => {
        for (let i = 1; i < 8; i++) {
            const x = rank + i * dir[0];
            const y = file + i * dir[1];

            if (position?.[x]?.[y] === undefined) {
                break;
            }
            if (position[x][y].startsWith(enemy)) {
                moves.push([x, y]);
                break;
            }
            if (position[x][y].startsWith(us)) {
                break;
            }
            moves.push([x, y]);
        }
    });
    return moves;
}

export const getKnightMoves = ({ position, piece, rank, file }) => {
    const moves = [];
    const us = piece[0];
    const enemy = us === 'w' ? 'b' : 'w';

    const direction = [
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1]
    ];

    direction.forEach(dir => {

        const x = rank + dir[0];
        const y = file + dir[1];

        if (position?.[x]?.[y] !== undefined && (position[x][y].startsWith(enemy) || position[x][y] === '')) {
            moves.push([x, y]);
        }
    });

    return moves;
}

export const getBishopMoves = ({ position, piece, rank, file }) => {
    const moves = [];
    const us = piece[0];
    const enemy = piece[0] === 'w' ? 'b' : 'w';

    const direction = [
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1]
    ]
    direction.forEach(dir => {
        for (let i = 1; i < 8; i++) {
            const x = rank + i * dir[0];
            const y = file + i * dir[1];

            if (position?.[x]?.[y] === undefined) {
                break;
            }
            if (position[x][y].startsWith(enemy)) {
                moves.push([x, y]);
                break;
            }
            if (position[x][y].startsWith(us)) {
                break;
            }
            moves.push([x, y]);
        }
    });
    return moves;
}

export const getQueenMoves = ({ position, piece, rank, file }) => {
    const moves = [];
    const us = piece[0];
    const enemy = piece[0] === 'w' ? 'b' : 'w';

    const direction = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
    ]
    direction.forEach(dir => {
        for (let i = 1; i < 8; i++) {
            const x = rank + i * dir[0];
            const y = file + i * dir[1];

            if (position?.[x]?.[y] === undefined) {
                break;
            }
            if (position[x][y].startsWith(enemy)) {
                moves.push([x, y]);
                break;
            }
            if (position[x][y].startsWith(us)) {
                break;
            }
            moves.push([x, y]);
        }
    });
    return moves;
}

export const getKingMoves = ({ position, piece, rank, file }) => {
    const moves = [];
    const us = piece[0];
    const enemy = piece[0] === 'w' ? 'b' : 'w';

    const direction = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
    ]
    direction.forEach(dir => {

        const x = rank + dir[0];
        const y = file + dir[1];

        if (position?.[x]?.[y] !== undefined && (position[x][y].startsWith(enemy) || position[x][y] === '')) {
            moves.push([x, y]);
        }
    });
    return moves;
}

export const getPawnMoves = ({ position, piece, rank, file }) => {
    const moves = [];
    const us = piece[0];
    const enemy = piece[0] === 'w' ? 'b' : 'w';

    const dir = piece === 'wp' ? 1 : -1;
    const x = rank + dir;
    const y = file;
    if (position?.[x]?.[y] === '') {
        moves.push([x, y]);
    }
    if (piece === 'wp' && rank === 1) {
        if (position?.[x + dir]?.[y] === '') {
            moves.push([x + dir, y]);
        }
    }
    if (piece === 'bp' && rank === 6) {
        if (position?.[x + dir]?.[y] === '') {
            moves.push([x + dir, y]);
        }
    }
    return moves;
}

export const getPawnCaptures = ({ position, prevPosition, piece, rank, file }) => {
    const moves = [];
    const us = piece[0];
    const enemy = piece[0] === 'w' ? 'b' : 'w';

    const dir = piece === 'wp' ? 1 : -1;

    if (position?.[rank + dir]?.[file - 1] && position?.[rank + dir]?.[file - 1].startsWith(enemy)) {
        moves.push([rank + dir, file - 1]);
    }

    if (position?.[rank + dir]?.[file + 1] && position?.[rank + dir]?.[file + 1].startsWith(enemy)) {
        moves.push([rank + dir, file + 1]);
    }

    // en-passant capture
    const enemyPawn = dir === 1 ? 'bp' : 'wp';
    if (prevPosition) {
        if ((dir === 1 && rank === 4) || (dir === -1 && rank === 3)) {
            if (position?.[rank]?.[file - 1] === enemyPawn &&
                prevPosition?.[rank]?.[file - 1] === '' &&
                position?.[rank + dir + dir]?.[file - 1] === '' &&
                prevPosition?.[rank + dir + dir]?.[file - 1] === enemyPawn
            ) moves.push([rank + dir, file - 1]);
        }
        if ((dir === 1 && rank === 4) || (dir === -1 && rank === 3)) {
            if (position?.[rank]?.[file + 1] === enemyPawn &&
                prevPosition?.[rank]?.[file + 1] === '' &&
                position?.[rank + dir + dir]?.[file + 1] === '' &&
                prevPosition?.[rank + dir + dir]?.[file + 1] === enemyPawn
            ) moves.push([rank + dir, file + 1]);
        }
    }
    return moves;
};

export const getCastlingMoves = ({ position, castlingDirection, piece, rank, file }) => {
    const moves = [];
    console.log(castlingDirection);
    if (file !== 4 || rank % 7 !== 0 || castlingDirection === 'none') {
        return moves;
    }
    if (piece.startsWith('w')) {

        if (['left', 'both'].includes(castlingDirection) &&
            !position[0][3] &&
            !position[0][2] &&
            !position[0][1] &&
            position[0][0] === 'wr'
        ) {
            moves.push([0, 2]);
        }
        if (['right', 'both'].includes(castlingDirection) &&
            !position[0][5] &&
            !position[0][6] &&
            position[0][7] === 'wr'
        ) {
            moves.push([0, 6]);
        }
    } else {

        if (['left', 'both'].includes(castlingDirection) &&
            !position[7][3] &&
            !position[7][2] &&
            !position[7][1] &&
            position[7][0] === 'br'
        ) {
            moves.push([7, 2]);
        }
        if (['right', 'both'].includes(castlingDirection) &&
            !position[7][5] &&
            !position[7][6] &&
            position[7][7] === 'br'
        ) {
            moves.push([7, 6]);
        }
    }
    return moves;
};

export const getCastleDirections = ({ castleDirection, piece, rank, file }) => {
    rank = Number(rank);
    file = Number(file);
    const direction = castleDirection[piece[0]];
    if (piece.endsWith('k')) {
        return 'none';
    }
    if (file === 0 && rank === 0) {
        if (direction === 'both') return 'right';
        if (direction === 'left') return 'none';
    }
    if (file === 7 && rank === 0) {
        if (direction === 'both') return 'left';
        if (direction === 'right') return 'none';
    }
    if (file === 0 && rank === 7) {
        if (direction === 'both') return 'right';
        if (direction === 'left') return 'none';
    }
    if (file === 7 && rank === 7) {
        if (direction === 'both') return 'left';
        if (direction === 'right') return 'none';
    }
};
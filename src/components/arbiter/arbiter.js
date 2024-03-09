import { getBishopMoves, getKingMoves, getKnightMoves, getPawnCaptures, getPawnMoves, getQueenMoves, getRookMoves, getCastlingMoves, getkingPosition, getPieces, getKingPosition } from "./getMoves"
import { movePawn, movePiece } from "./move";

const arbiter = {
    getRegularMoves: function ({ position, piece, rank, file }) {
        if (piece.endsWith('r')) return getRookMoves({ position, piece, rank, file });
        if (piece.endsWith('n')) return getKnightMoves({ position, piece, rank, file });
        if (piece.endsWith('b')) return getBishopMoves({ position, piece, rank, file });
        if (piece.endsWith('q')) return getQueenMoves({ position, piece, rank, file });
        if (piece.endsWith('k')) return getKingMoves({ position, piece, rank, file });
        if (piece.endsWith('p')) return getPawnMoves({ position, piece, rank, file })
    },
    getValidMoves: function ({ position, prevPosition, castlingDirection, piece, rank, file }) {
        let moves = this.getRegularMoves({ position, piece, rank, file });
        const notInCheckMoves = [];

        if (piece.endsWith('p')) {
            moves = [
                ...moves,
                ...getPawnCaptures({ position, prevPosition, piece, rank, file })
            ]
        }
        if (piece.endsWith('k')) {
            moves = [
                ...moves,
                ...getCastlingMoves({ position, castlingDirection, piece, rank, file })
            ]
            console.log(getCastlingMoves({ position, castlingDirection, piece, rank, file }));
        }

        moves.forEach(([x, y]) => {
            const positionAfterMove = this.performMove({ position, piece, rank, file, x, y });

            if (!this.isPlayerInCheck({ positionAfterMove, position, player: piece[0] })) {
                notInCheckMoves.push([x, y]);
            }
        })
        return notInCheckMoves;
    },
    performMove: function ({ position, piece, rank, file, x, y }) {
        if (piece.endsWith('p')) {
            return movePawn({ position, piece, rank, file, x, y });
        } else {
            return movePiece({ position, piece, rank, file, x, y });
        }
    },
    isPlayerInCheck: function ({ positionAfterMove, position, player }) {
        const enemy = player.startsWith('w') ? 'b' : 'w'
        let kingPos = getKingPosition(positionAfterMove, player)
        const enemyPieces = getPieces(positionAfterMove, enemy)

        const enemyMoves = enemyPieces.reduce((acc, p) => acc = [
            ...acc,
            ...(p.piece.endsWith('p')
                ? getPawnCaptures({
                    position: positionAfterMove,
                    prevPosition: position,
                    ...p
                })
                : this.getRegularMoves({
                    position: positionAfterMove,
                    ...p
                })
            )
        ], [])

        if (enemyMoves.some(([x, y]) => kingPos[0] === x && kingPos[1] === y))
            return true
        else
            return false
    },
}


export default arbiter;
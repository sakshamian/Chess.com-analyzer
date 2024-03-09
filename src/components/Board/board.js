import './board.css'
// import { useAppContext } from '../../contexts/Context'

import Pieces from '../Pieces/Pieces'
import { useAppContext } from '../../context/Context'
import Popup from '../Popup/Popup'
import PromotionBox from '../Popup/PromotionBox/PromotionBox'
// import Popup from '../Popup/Popup'
// import GameEnds from '../Popup/GameEnds/GameEnds'

// import arbiter from '../../arbiter/arbiter'
// import { getKingPosition } from '../../arbiter/getMoves'

const Board = () => {
    const ranks = Array(8).fill().map((x, i) => 8 - i)
    const files = Array(8).fill().map((x, i) => i + 1)

    const { appState } = useAppContext();
    const position = appState.position[appState.position.length - 1];

    const getClassName = (i, j) => {
        let c = 'tile'
        c += (i + j) % 2 === 0 ? ' tile--dark ' : ' tile--light '
        if (appState.candidateMoves?.find(m => m[0] === i && m[1] === j)) {
            if (position[i][j])
                c += ' attacking'
            else
                c += ' highlight'
        }

        // if (checkTile && checkTile[0] === i && checkTile[1] === j) {
        //     c += ' checked'
        // }

        return c;
    }

    return <div className='board'>


        <div className="ranks">
            {ranks.map(rank => <span key={rank}>{rank}</span>)}
        </div>

        <div className='tiles'>
            {ranks.map((rank, i) =>
                files.map((file, j) =>
                    <div
                        key={file + '' + rank}
                        i={i}
                        j={j}
                        className={`${getClassName(7 - i, j)}`}>
                    </div>
                ))}
        </div>

        <div className="files">
            {files.map(file => <span key={file}>{String.fromCharCode(file + 96)}</span>)}
        </div>

        <Pieces />

        <Popup />
    </div>

}

export default Board
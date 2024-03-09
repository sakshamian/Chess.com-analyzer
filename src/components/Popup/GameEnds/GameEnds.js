import { Status } from '../../../constant';
import { useAppContext } from '../../../context/Context';
import { setupNewGame } from '../../reducer/actions/game';
import './gameEnds.css'

const GameEnds = ({ onClosePopup }) => {

    const { appState: { status }, dispatch } = useAppContext();

    if (status === Status.ongoing || status === Status.promoting)
        return null

    const newGame = () => {
        dispatch(setupNewGame())
    }

    const isWin = status.endsWith('wins')

    return <div className="popup--inner popup--inner__center">
        <h1>{isWin ? status : 'Draw'}</h1>
        <p>{!isWin && status}</p>
        <div className='' style={{ fontSize: '15px', color: '#3c3a38', fontWeight: 'bold' }}>
            {
                isWin ? <></> : <>½ - ½</>
            }
        </div>
        <div className={`${status}`} />
        <button onClick={newGame}>New Game</button>
    </div>

}

export default GameEnds;
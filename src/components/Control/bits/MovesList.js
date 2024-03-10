
import { useAppContext } from '../../../context/Context';
import './movesList.css'

const MovesList = () => {
    const { appState: { movesList } } = useAppContext();

    return <div className='moves-list'>
        {movesList.map((move, i) =>
            <div key={i} data-number={Math.floor(i / 2) + 1}>{move}</div>
        )}
    </div>
}

export default MovesList;
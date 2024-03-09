import './promotionBox.css';
import { useAppContext } from '../../../context/Context';
import { copyPosition, getNewMoveNotation } from '../../../helper';
import { clearCandidates, makeNewMove } from '../../reducer/actions/move';

import React from 'react'

const PromotionBox = ({ onClosePopup }) => {
    const { appState, dispatch } = useAppContext();
    const { promotionSquare } = appState;
    const options = ['q', 'r', 'b', 'n'];

    if (!promotionSquare) return null;

    const color = promotionSquare.x === 7 ? 'w' : 'b';

    const handleClick = (option) => {
        onClosePopup();
        const newPosition = copyPosition(appState.position[appState.position.length - 1]);
        newPosition[promotionSquare.rank][promotionSquare.file] = ''
        newPosition[promotionSquare.x][promotionSquare.y] = color + option;
        // const newMove = getNewMoveNotation({
        //     ...appState.selectedPiece,
        //     x: promotionSquare.rank,
        //     y: promotionSquare.file,
        //     position: appState.position[appState.position.length - 1],
        //     promotesTo: option
        // })
        dispatch(clearCandidates())
        dispatch(makeNewMove({ newPosition }))
    };
    const getPromotionBoxPosition = () => {
        let style = {}

        if (promotionSquare.x === 7) {
            style.top = '-5%'
        }
        else {
            style.top = '95%'
        }

        if (promotionSquare.y <= 1) {
            style.left = '0%'
        }
        else if (promotionSquare.y >= 5) {
            style.right = '0%'
        }
        else {
            style.left = `${12.5 * promotionSquare.y - 20}%`
        }

        return style
    }

    return <div className="popup--inner promotion-choices" style={getPromotionBoxPosition()}>
        {options.map(option =>
            <div key={option}
                onClick={() => handleClick(option)}
                className={`piece ${color}${option}`}
            />
        )}
    </div>
}

export default PromotionBox;
import PromotionBox from './PromotionBox/PromotionBox';
import React from 'react';
import './popup.css';
import { useAppContext } from '../../context/Context';
import { Status } from '../../constant';
import { closePopup } from '../reducer/actions/popup';

const Popup = ({ children }) => {

    const { appState: { status }, dispatch } = useAppContext();

    const onClosePopup = () => {
        dispatch(closePopup())
    }

    if (status === Status.ongoing)
        return null

    return <div className="popup">
        {React.Children
            .toArray(children)
            .map(child => React.cloneElement(child, { onClosePopup }))}
    </div>
}

export default Popup
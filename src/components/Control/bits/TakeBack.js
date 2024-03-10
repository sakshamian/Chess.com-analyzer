import { useAppContext } from "../../../context/Context";
import { takeBack } from "../../reducer/actions/move";

const TakeBack = () => {

    const { dispatch } = useAppContext();

    const handleClick = () => {
        dispatch(takeBack());
    }
    return <div>
        <button onClick={handleClick}>Take Back</button>
    </div>
}

export default TakeBack;
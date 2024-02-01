
import { useDispatch } from 'react-redux';
import EthereumIcon from '../assets/images/Group 55.png';
import { setsendTokenModal } from "../redux/counter";
import { setCurrentTokenForSend, setOperation } from '../redux/wallet';


const TokenItem = ({data}: any) => {
    
    const dispatch = useDispatch();

    const handleTokenSend = ()=>{
        dispatch(setOperation("sendToken"))
        dispatch(setCurrentTokenForSend(data))
        dispatch(setsendTokenModal(true))
    }
    return (
        <div className="w-full h-20 bg-green my-2 rounded-lg flex justify-between p-4">
            <div>
                <div className="flex items-center">
                    <img src={EthereumIcon} alt="Ethereum Icon" />
                    <p className="ms-2 text-black font-semibold">{data.name}</p>
                </div>
                <p className="text-xs text-black font-semibold">{data.balance}</p>
            </div>
            <div>
                <button onClick={handleTokenSend} className="text-btnColor cursor-pointer">send</button>
            </div>
        </div>
      
    )
}


export default TokenItem;
import { BsX } from "react-icons/bs";
import logo from "../assets/images/logo.png";
import walletlogo from "../assets/images/wallet_logo.png";
import EthereumIcon from '../assets/images/Group 55.png';
import { Input } from "antd";
import { setConfirmationSendTokenModal, setsendTokenModal } from "../redux/counter";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { saveReciverDetails, setOperation } from "../redux/wallet";
import { RootState } from "../redux/store";



const SendToken = () => {


    const [sendTokenData,SetSendTokenData] = useState({address:"",amount:""})
    const token : any = useSelector((state:RootState)=>state.wallet.currentToken)
    const operation  = useSelector((state:RootState)=>state.wallet.operation)



    const dispatch = useDispatch();


    const handleChange = (e:any)=>{

        SetSendTokenData((prevData:any)=>({...prevData,[e.target.name]:e.target.value}))
        
    }


    const hanndleSendToken = ()=>{

        // saving reciever account
        dispatch(saveReciverDetails(sendTokenData))
       


        dispatch(setConfirmationSendTokenModal(true))
        dispatch(setsendTokenModal(false))
    }

    console.log(sendTokenData)

    return (
        <div className="fixed z-10 top-0 right-0 bottom-0 left-0 w-full h-[100vh] bg-bgColor2 bg-opacity-50 flex flex-col pt-5 items-center">

            <img src={walletlogo} alt="logo" />

            <div className="w-[35%]  rounded-3xl bg-white card-shadow mt-4 py-4 px-6">
                <div className="w-full flex justify-between items-center pt-2 pr-2 text-2xl ">
                    <p></p>
                    <p className="text-heading text-1xl text-center cursor-pointer font-bold">Send Tokens</p>

                    <BsX onClick={() => dispatch(setsendTokenModal(false))} className="text-btnColor cursor-pointer" />
                </div>


                <div className="flex justify-between mt-2">
                    <p>Wallet Address</p>
                    <div className="w-[70%]">
                        <Input  name="address" value={sendTokenData.address} onChange={handleChange}   placeholder="Wallet Address" className="text-black border border-btnColor bg-green text-lg mt-1" />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <p>Assets</p>
                    <div className="w-[70%] p-4 bg-bgShade rounded-xl">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <img src={EthereumIcon} alt="Ethereum Icon" />
                                <p className="ms-3 font-semibold">{operation === "sendToken" ? token.symbol:token.name}</p>
                            </div>
                            <p>Balance {token.balance} {operation === "sendToken" ? token.symbol:token.name}</p>
                        </div>

                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <p>Amount</p>
                    <div className="w-[70%] p-4 bg-green rounded-xl">
                    <Input name="amount" value={sendTokenData.amount} onChange={handleChange} className="text-black   border-btnColor bg-greens " suffix={<span className="flex"><img  src={EthereumIcon} alt="Ethereum Icon" /> <p className="ms-2">{operation === "sendToken" ? token.symbol:token.name}</p></span>}   />
                      

                    </div>
                </div>


                <div className="flex flex-col justify-center items-center pt-6">

                    <div className="w-full px-4 bg-bgShade rounded-xl py-3">
                        <div className="flex justify-between ">
                            <div>
                                <p>Gas  <span className="text-xs text-btnColor">(Estimation)</span></p>
                            </div>
                            <div>
                                <p >0.0000288 ETH</p>
                            </div>
                        </div>
                        <div className="flex justify-between  text-xs">
                            <div>
                                <p>Likely in 30 secs </p>
                            </div>
                            <div>
                                <p> <span className="text-btnColor mr-2">Max Fee</span>0.00000288 ETH</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[4px] bg-secondary-dark mt-20"></div>
                    <button onClick={hanndleSendToken} className="px-10 py-2 rounded-full text-white bg-btnColor hover:bg-btnColorHover mt-7 text-lg">Send Tokens</button>
                </div>
            </div>
        </div>
    )
}


export default SendToken;
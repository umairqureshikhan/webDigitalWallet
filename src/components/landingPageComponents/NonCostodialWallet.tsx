import logo from "../../assets/images/logo.png";
import walletlogo from "../../assets/images/wallet_logo.png";
import Rectangle from "../../assets/images/Rectangle.png";
import criptolock from "../../assets/images/criptolock.gif"
import { useNavigate } from "react-router-dom";

const NonCostodialWallet = () => {

    const navigate =  useNavigate()
    return (



        <div className="flex justify-between placeholder w-full h-[80vh] px-10 ">
            <div className="text-black w-full">
                <img className="w-36 -ms-8" src={walletlogo} alt="logo" />
                <div className="w-full pt-10 flex justify-between">
                    <div>
                        <h1 className="mt-20 text-7xl font-bold ">Non-Custodial <span className="font-bold text-btnColor">Wallet</span></h1>
                        {/* <span className="text-6xl font-bold text-btnColor mt-2">Wallet</span> */}
                        <p className="mt-4 text-xl" >protect your crypto with non-custodial Wallet</p>
                        <p className="font-semibold text-xl">YOUR KEYS YOUR RULES</p>
                        <button onClick={()=>{navigate("/home")}} className="bg-btnColor hover:bg-btnColorHover text-lg text-white font-semibold rounded-full w-52 h-12 mt-4">Go to Wallet</button>
                    </div>
                    <div >
                        <img src={criptolock} alt="Rectangle" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NonCostodialWallet;
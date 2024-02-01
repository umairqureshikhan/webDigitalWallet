
import logo from "../../assets/images/logo.png";
import walletlogo from "../../assets/images/wallet_logo.png";
import { useNavigate } from "react-router-dom";

const LandingFooter = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-bgShade w-full mt-16 ">
            <div className="flex ms-12 pb-10">
                <div className="mt-12">
                    <img className="w-36 " src={walletlogo} alt="logo" />
                    <p className="font-semibold text-xl mt-8">YOUR KEYS YOUR RULES</p>
                    <button onClick={()=>{navigate("/home")}} className="bg-btnColor hover:bg-btnColorHover font-semibold text-lg text-white rounded-full w-52 h-12 mt-4 ">Go to wallet</button>

                </div>
                <div className="flex mt-12 ms-12">
                    <div className="flex flex-col px-10">
                        <h1 className="text-2xl font-semibold">features</h1>
                        <p className="mt-2">Multichain Wallet</p>
                        <p className="mt-2">Dual Encription</p>
                        <p className="mt-2">Security</p>
                        <p className="mt-2">Multiple Accounts</p>
                        <p className="mt-2">Multiple Networks</p>

                    </div>
                    <div className="flex flex-col px-10">
                        <h1 className="text-2xl font-semibold">Build</h1>
                        <p className="mt-2"> Developer Docs</p>
                        <p className="mt-2">Wallet Core</p>
                        <p className="mt-2">Get Asset</p>


                    </div>
                    <div className="flex flex-col px-10">
                        <h1 className="text-2xl font-semibold">Support</h1>
                        <p className="mt-2">FAQ</p>
                        <p className="mt-2">Community Forum</p>
                        <p className="mt-2">Contact Us</p>


                    </div>
                    <div className="flex flex-col px-10">
                        <h1 className="text-2xl font-semibold">About</h1>
                        <p className="mt-2">About Us</p>
                        <p className="mt-2">Terms of Service</p>
                        <p className="mt-2">Privacy Policy</p>
                        <p className="mt-2"> Blog</p>


                    </div>
                </div>
            </div>
            <div className="flex justify-end pb-4 pr-4">
                <p>CopyRight@2023 </p>
            </div>


        </div>
    )
}

export default LandingFooter;
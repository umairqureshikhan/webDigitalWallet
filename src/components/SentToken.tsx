import { BiSolidRightArrowAlt } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import logo from "../assets/images/logo.png";
import walletlogo from "../assets/images/wallet_logo.png";
import { useDispatch } from "react-redux";
import { setConfirmationSendTokenModal, setSentTokenModal } from "../redux/counter";



const SentToken = () => {
    const dispatch = useDispatch();

    return (
        <div className="absolute z-10 top-0 right-0 bottom-0 left-0 w-full bg-bgColor2 bg-opacity-20 flex flex-col pt-5 items-center">

            <img src={walletlogo} alt="logo" />
            <div className="rounded-3xl bg-white  p-4 w-[50%] px-8  absolute top-10 h-[90vh]">
                <div className="w-full flex justify-between items-center pt-2 pr-2 text-2xl ">
                    <p className="text-heading text-3xl text-start cursor-pointer font-semibold">Sent</p>
                    <BsX onClick={() => { dispatch(setSentTokenModal(false))}}className="text-btnColor cursor-pointer" />
                </div>
                <div className="w-full h-[4px] bg-btnColor mt-4"></div>
                <div className="flex justify-between mt-8">
                    <div>
                        <div className="flex flex-col justify-between text-black">
                            <p>Status</p>
                            <p>Confirmed</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col justify-between">
                            <p className="text-black"> View on block explorer</p>
                            <p className="text-btnColor ps-4">Copy Transaction ID</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="w-[33%]">
                        <p className="font-bold text-xl">From</p>
                        <div className="flex bg-green w-[260px] py-4 rounded-xl ">
                            <div className="flex justify-center  items-center w-full ">
                                <p className="h-10 w-10 rounded-full bg-bgColor "></p>
                                <p className="ps-5 text-black">Account 1</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[33%] flex justify-center">
                        <div className="h-12 w-12 rounded-full bg-bgColor">
                            <p className=" text-white  py-2 ps-2 text-3xl "> <BiSolidRightArrowAlt /></p>
                        </div>
                    </div>
                    <div className="w-[33%]">
                        <p className="font-bold text-xl">To</p>
                        <div className="flex bg-green w-[260px] py-4 rounded-xl ">
                            <div className="flex justify-center  items-center w-full ">
                                <p className="h-10 w-10 rounded-full bg-bgColor "></p>
                                <p className="ps-5 text-black">Account 2</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-black text-3xl pt-3 font-bold">Transaction</p>
                </div>

                <div className="flex justify-between mt-2">
                    <div>
                        <p>Nonce</p>
                    </div>
                    <div>
                        <p>260</p>
                    </div>
                </div>

                <div className="flex justify-between mt-2">
                    <div>
                        <p className="text-lg">Amount</p>
                    </div>
                    <div>
                        <p className="text-lg text-btnColor">0.2 ETH</p>
                    </div>
                </div>

                <div className="flex justify-between mt-2">
                    <div>
                        <p className="text-lg">Gas Limits <span className="text-xs text-btnColor">(Units)</span></p>
                    </div>
                    <div>
                        <p className="text-lg">2100</p>
                    </div>
                </div>
                <div className="flex justify-between mt-2">
                    <div>
                        <p className="text-lg">Gas used <span className="text-xs text-btnColor">(Units)</span></p>
                    </div>
                    <div>
                        <p className="text-lg">2100</p>
                    </div>
                </div>
                <div className="flex justify-between mt-2">
                    <div>
                        <p className="text-lg">Bas fee <span className="text-xs text-btnColor">(GWEI)</span></p>
                    </div>
                    <div>
                        <p className="text-lg">0.000000015</p>
                    </div>
                </div>
                <div className="flex justify-between mt-2">
                    <div>
                        <p className="text-lg">Priority fee <span className="text-xs text-btnColor">(GWEI)</span></p>
                    </div>
                    <div>
                        <p className="text-lg">260</p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div>
                        <p className="text-black text-lg  pt-3">Total Gas Fee</p>
                    </div>
                    <div className="flex flex-col text-black   pt-3">
                        <p className="ps-7 pb-2">0.2 ETH</p>
                        <p>$ 1220 USD</p>
                    </div>
                </div>
                <div className="flex justify-between pt-3">
                    <div>
                        <p className="text-black text-lg  pt-3">Max Fee Per Gas</p>
                    </div>
                    <div className="flex flex-col text-black  pt-3">
                        <p className="ps-7 pb-2">0.2 ETH</p>
                        <p>$ 1220 USD</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SentToken;
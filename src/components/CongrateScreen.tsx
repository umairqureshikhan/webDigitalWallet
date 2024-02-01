
import congratIcon from '../assets/images/congrate-icon.png';
import { useNavigate } from "react-router-dom";

const CongrateScreen = () => {

    const navigate = useNavigate();

    return (

        <div className="w-[50%] flex justify-center shadow-2xl shadow-btnColor items-center flex-col bg-primary rounded-2xl pb-8">

            <div className='mt-8'>
                <img src={congratIcon} alt='congratulations-icon' />
            </div>

            <h2 className="text-5xl text-heading font-bold text-center mt-4">Wallet creation successful</h2>

            <p className="mt-6 w-[80%]">
                You've successfully protected your wallet. Keep your Secret Recovery Phrase safe and secret
            </p>

            <div className="w-3/5 mx-auto my-4 ">
                <ul className="ml-6 list-disc">
                    <li className="text-btnColor">
                        <span className="">MetaMask can't recover your Sec.</span>
                    </li>

                    <li className="text-btnColor">
                        <span className="">MetaMask will never ask you for y Save as... Phrase.</span>
                    </li>

                    <li className="text-btnColor">
                        <span className="">Never share your Secret Recover or risk your funds being stolen.</span>
                    </li>
                </ul>
            </div>

            <button className="bg-btnColor rounded-full w-48 p-3 text-white-1 mt-4 hover:bg-btnColorHover" onClick={() => navigate("/app")}> Next </button>

        </div>

    )
}

export default CongrateScreen;
import { useDispatch } from "react-redux";
import { incrementStep } from "../redux/counter";
import { setImportWallet } from "../redux/wallet";

function MainComponenet() {
  const dispatch = useDispatch();


  return (
    <>
      <div className="w-[50%] h-[60vh] bg-primary card-shadow z-10 bg-opacity-80 rounded-2xl p-12 flex flex-col justify-between">
        <div>
          <p className="text-4xl font-bold text-center">
            A crypto wallet & gateway to blockchain app
          </p>
          <p className="mt-6">
            Start exploring blockchain applications in seconds. Trusted by over 30
            million users worldwide.
          </p>
        </div>
        <div className="flex justify-center flex-col items-center">
          <button
            onClick={() => {dispatch(incrementStep(1)); dispatch(setImportWallet(false))}}
            className="bg-btnColor rounded-full w-48 p-3 text-white-1 hover:bg-btnColorHover"
          >
            Create Wallet
          </button>
          <button
           onClick={() => {dispatch(incrementStep(2)); dispatch(setImportWallet(true))}}
           className="border border-btnColor rounded-full w-48 p-3 text-btnColor mt-4 hover:bg-btnColor hover:text-white-1">Import Wallet</button>

        </div>
      </div>
    </>
  );
}

export default MainComponenet;

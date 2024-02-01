import { useState } from "react";
import AccountMenu from './AccountMenu';
import { RootState } from "../redux/store";
import AccountAdd from "./AccountAdd";
import NetworkDetails from "./NetworkDetails";
import AccountDetails from "./AccountDetails";
import NetworkMenue from "./NetworkMenue";
import { setOpenAccount } from "../redux/counter";
import Avatar, { genConfig } from 'react-nice-avatar'
import { useDispatch, useSelector } from "react-redux";
import ethereumIcon from '../assets/images/Group 55.png';
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { setOpenNetworkMenu } from "../redux/wallet";


const AppHeader = () => {



    const dispatch = useDispatch();

    const [isNewAccount, setIsNewAccount] = useState();
    const [isEditable, SetIsEditable] = useState(false)
    const [exploreNetwork, setExploreNetwork] = useState(true);
    // const [openNetworkMenu, setOpenNetworkMenu] = useState(false);
    const [openNetworkModal, setOpenNetworkModal] = useState(false);

    const wallet: any = useSelector((state: RootState) => state.wallet.data)
    const openAccountModal = useSelector((state: RootState) => state.user.openAccount)
    const openAccountDetails = useSelector((state: RootState) => state.wallet.accountDetails)
    const currentAccount = useSelector((state: RootState) => state.wallet.currentAccount)
    const currentNetwork = useSelector((state: RootState) => state.wallet.currentNetwork)
    const openNetworkMenu = useSelector((state: RootState) => state.wallet.openNetworkMenu)

    const handleAddNetwork = () => {
        SetIsEditable(true)
        setOpenNetworkModal(true)

    }


    return (
        <div className="relative py-2 px-4 flex justify-between items-center w-full bg-white rounded-full shadow-sm shadow-black1 card-shadow z-10 bg-opacity-80">

            <div className="flex-1">
                <button onClick={() => { dispatch(setOpenNetworkMenu(!openNetworkMenu)) }} className="h-[30px] w-fit border border-white flex items-center rounded-md bg-green">

                    <div className="w-5 bg-btnColor h-full rounded-md flex justify-center items-center">
                        <img src={ethereumIcon} alt="blockchain icon" />
                    </div>

                    <p className="text-heading ms-2">{currentNetwork.name}</p>

                    {
                        openNetworkMenu ?
                            <BiSolidUpArrow className="ms-4 mt-1 mr-2 cursor-pointer" size={'12px'} />
                            :
                            <BiSolidDownArrow className="ms-4 mt-1 mr-2 cursor-pointer" size={'12px'} />
                    }

                </button>
            </div>


            {
                openNetworkMenu &&
                    <div className="absolute  top-14 w-[30%] h-[26rem] bg-primary border-white border-2 rounded-lg p-2 card-shadow z-10">
                        <p className="text-black m-4 font-semibold ">Add new network</p>

                        <div className="px-2 w-full max-h-[300px] h-[270px] overflow-x-auto" id="style-4">
                            {
                                wallet["networks"].map((network: any, index: any) => {
                                    return (
                                        <NetworkMenue networkNumber = {index} setOpenNetworkModal={setOpenNetworkModal} setExploreNetwork={setExploreNetwork} network={network} SetIsEditable={SetIsEditable} />
                                    )
                                })
                            }
                        </div>

                        <button onClick={() => handleAddNetwork()} className="bg-btnColor hover:bg-btnColorHover rounded-full w-40 p-2 text-white-1 mt-4 ms-2">
                            Add Network
                        </button>

                    </div>
                
            }

            <div className="flex-1 flex justify-center">
                <button onClick={() => { dispatch(setOpenAccount(true)) }} className="flex items-center">

                    <Avatar className="w-8 h-8" {...genConfig(currentAccount.address)} />
                    <p className="ms-4 cursor-pointer">{currentAccount.name}</p>
                    <BiSolidDownArrow className="ms-4 cursor-pointer" size={'12px'} />

                </button>
            </div>

            <div className="flex-1 flex justify-end">
            </div>

            {
                openNetworkModal &&
                <NetworkDetails isEditable={isEditable} exploreNetwork={exploreNetwork} openNet={(value: boolean) => setOpenNetworkModal(value)} />
            }

            {
                openAccountModal &&
                <AccountMenu isAccountOpen={(value: boolean) => setOpenAccount(value)} isNewAccount={(value: any) => { setIsNewAccount(value); setOpenAccount(false) }} />
            }

            {
                isNewAccount && <AccountAdd accountType={isNewAccount} isNewAccount={(value: any) => setIsNewAccount(value)} />
            }

            {
                openAccountDetails.address && <AccountDetails />
            }

        </div>

    );
}


export default AppHeader;
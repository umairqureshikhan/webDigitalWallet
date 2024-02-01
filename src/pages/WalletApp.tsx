import logo from "../assets/images/logo.png";
import walletlogo from "../assets/images/wallet_logo.png";
import { BsThreeDotsVertical, BsFillPersonFill } from "react-icons/bs";
import { BiSolidCopy, BiSolidDownArrow, BiSolidSend } from 'react-icons/bi';
import ethereumIcon from '../assets/images/ethereum-icon.png';
import AppHeader from "../components/AppHeader";
import TokensTable from "../components/tokens-table";
import SendToken from "../components/SendToken";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TokenConfirmation from "../components/TokenConfirmation";
import SentToken from "../components/SentToken";
import { useEffect, useState } from "react";
import { getWallet, setCurrentTokenForSend, setError, setOperation, walletGetBalance, walletGetToken, walletTxHistory } from "../redux/wallet";
import { setsendTokenModal } from "../redux/counter";
import ImportToken from "../components/ImportToken";
import { Tooltip } from "antd";



const WalletApp = () => {
    const [tooltipContent, setTooltipContent] = useState('Copy');
   

  
    const dispatch = useDispatch()
    const openSendToken = useSelector((state: RootState) => state.user.openSendToken)
    const openConfirmationSendToken = useSelector((state: RootState) => state.user.openConfirmationSendToken)
    const openSentToken = useSelector((state: RootState) => state.user.openSentToken)
    const currentAccount = useSelector((state:RootState)=>state.wallet.currentAccount)
    const currentNetwork = useSelector((state:RootState)=>state.wallet.currentNetwork)
    const balance = useSelector((state:RootState)=>state.wallet.balance)
    const openImportTokenModal = useSelector((state:RootState)=>state.user.openImportTokenModal)


    const copyToClipboard = () => {
        if (currentAccount.address) {
          navigator.clipboard.writeText(currentAccount.address);
          setTooltipContent('Copied!');
          setTimeout(() => {
            setTooltipContent('Copy');
          }, 2000);
        }
      };
   

    useEffect(()=>{
        try {
        
            if (!currentAccount.address) {
                dispatch(getWallet())   
            }
            else{
    
                console.log(currentAccount.address)
                console.log(currentNetwork.providerURL)
                dispatch(walletGetBalance({address:currentAccount.address,rpcUrl:currentNetwork.providerURL}))
                dispatch(walletGetToken({tokens:currentAccount.tokens,rpcUrl:currentNetwork.providerURL, address:currentAccount.address,network:currentNetwork.name}))
                dispatch(walletTxHistory({address:currentAccount.address,chainId:currentNetwork.chainId}))
            
            }
        } catch (error) {
            dispatch(setError(error))
        }
        


    },[currentAccount.address, currentNetwork.name])




    const hanndleSendToken = ()=>{

        dispatch(setOperation("sendNativeToken"))
        dispatch(setCurrentTokenForSend({balance:balance,name:currentNetwork.coinName}))
        dispatch(setsendTokenModal(true))


    }


    return (
        <div className="flex flex-col justify-center items-center m-4">
            <div className="w-36">
                <img src={walletlogo} alt='Logo' />
            </div>

            <div className="w-[80%] p-2 h-[82vh] bg-primary mt-3 rounded-2xl flex flex-col items-center card-shadow z-10 bg-opacity-80">
                
                <AppHeader />

                <div className=" p-2 mt-5 flex justify-center rounded-md items-center  bg-green">
                    <p className="text-black">{currentAccount.address}</p>
                    <Tooltip title={tooltipContent}>
                    <BiSolidCopy className="text-btnColor mx-2 cursor-pointer"  onClick={copyToClipboard} />
                    </Tooltip>
                </div>

                <div className="mt-4 flex justify-center items-center'">
                    <p className="text-heading text-xl font-bold">{`${balance} ${currentNetwork.coinName}`}</p>
                    <div  onClick={hanndleSendToken} className="bg-bgColor ms-2 p-2 rounded-full flex justify-center items-center">
                        <BiSolidSend className="text-white -rotate-45 cursor-pointer" />
                    </div>
                </div>


                <div className="flex w-full justify-between items-center mt-10">
                <TokensTable tableHeading="Tokens"/>
                <TokensTable tableHeading="Activity"/>
                </div>

                {
                    openSendToken &&
                    <SendToken  />
                }

                {
                    openConfirmationSendToken &&
                    <TokenConfirmation />
                }
                
                {
                    openSentToken &&
                    <SentToken />
                }

                {
                openImportTokenModal &&
                <ImportToken />
                }

            </div>
        </div>
    )

            }

export default WalletApp;
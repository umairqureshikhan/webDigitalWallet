import { BsFillCaretLeftFill, BsX } from "react-icons/bs";
import logo from "../assets/images/logo.png";
import walletlogo from "../assets/images/wallet_logo.png";
import { Input } from "antd";
import { setPasswordState, setPasswordVerify } from "../redux/counter";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { SHA256 } from "crypto-js";
import { setError, walletAddAccount, walletDecrypt, walletGetBalance, walletGetToken, walletImport, walletSendToken, walletTxHistory } from "../redux/wallet";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";


const VerifyPassword = () => {
    const dispatch = useDispatch();
    const [Password, SetPassword] = useState("")
    const account = useSelector((state: RootState) => state.user.newAccount)
    const accountDetails = useSelector((state: RootState) => state.wallet.accountDetails)
    const wallet = useSelector((state: RootState) => state.wallet)
    const operation = useSelector((state: RootState) => state.wallet.operation)
    const currentNetwork = useSelector((state: RootState) => state.wallet.currentNetwork)
    const currentAccount = useSelector((state: RootState) => state.wallet.currentAccount)
    const reciever = useSelector((state: RootState) => state.wallet.reciever)
    const currentToken = useSelector((state: RootState) => state.wallet.currentToken)
    const importedPhrase = useSelector((state: RootState) => state.wallet.importedPhrase)
    const navigate = useNavigate()


    console.log(Password)

    const handleSubmitPassword = () => {

        try {
            
       

        if (operation === "importwallet") {

            dispatch(walletImport({ seedPhrase: importedPhrase, password: Password })).then((res: any) => {
                if (res.payload) {

                    navigate("/app")
                }
                else {
                    console.log("error")
                }
            })

        }
        else {


            const passwordHashStore = localStorage.getItem("passwordHash")
            const passwordHash = SHA256(Password).toString()

            if (passwordHashStore === passwordHash) {
                console.log("password matched")

                if (operation === "Addaccount") {


                    // close modal
                    dispatch(setPasswordVerify(false))

                    dispatch(walletDecrypt({ password: Password, type: "seedPhrase" })).then((res: any) => {

                        console.log("pppppppppppppp", res.payload)
                        dispatch(walletAddAccount({ esp: res.payload, password: Password, aountName: account.aountName, accountNumber: account.accountNumber }))


                    })

                }
                else if (operation === "showPK") {

                    // close modal

                    dispatch(walletDecrypt({ password: Password, type: "privateKey", address: accountDetails.address }))

                    dispatch(setPasswordVerify(false))

                }
                else if (operation === "sendNativeToken") {




                    const params = { password: Password, type: "privateKey", address: currentAccount.address }
                    dispatch(walletDecrypt(params)).then((res: any) => {

                        console.log("pppppppppppppp", res.payload)
                        const data = {
                            operation: operation,
                            rpcUrl: currentNetwork.providerURL,
                            epk: res.payload,
                            password: Password,
                            addressTo: reciever.address,
                            addressFrom: currentAccount.address,
                            amount: reciever.amount,
                            tokenAddress: ""
                        }
                        dispatch(walletSendToken(data)).then((res: any) => {

                         
                            dispatch(walletTxHistory({ address: currentAccount.address, chainId: currentNetwork.chainId }))
                            dispatch(walletGetBalance({ address: currentAccount.address, rpcUrl: currentNetwork.providerURL }))
                        })


                    })

                    // close modal
                    dispatch(setPasswordVerify(false))

                }
                else if (operation === "sendToken") {




                    const params = { password: Password, type: "privateKey", address: currentAccount.address }
                    dispatch(walletDecrypt(params)).then((res: any) => {

                        console.log("pppppppppppppp", res.payload)
                        const data = {
                            operation: operation,
                            rpcUrl: currentNetwork.providerURL,
                            epk: res.payload,
                            password: Password,
                            addressTo: reciever.address,
                            addressFrom: currentAccount.address,
                            amount: reciever.amount,
                            tokenAddress: currentToken.address
                        }
                        dispatch(walletSendToken(data)).then((res: any) => {

                            // error handle
                            dispatch(walletTxHistory({ address: currentAccount.address, chainId: currentNetwork.chainId }))
                            dispatch(walletGetToken({ tokens: currentAccount.tokens, rpcUrl: currentNetwork.providerURL, address: currentAccount.address, network: currentNetwork.name }))

                        })



                    })

                    // close modal
                    dispatch(setPasswordVerify(false))

                }

            } else {
                console.log("wrong Password")
            }


        }

    } catch (error) {
        dispatch(setError(error))
    }
     
    dispatch(setPasswordVerify(false))
    
}


    return (
        <div className="fixed z-20 top-0 right-0 bottom-0 left-0 w-full h-[100vh] bg-bgColor2 bg-opacity-50 flex flex-col pt-5 items-center">
            <img src={walletlogo} alt="logo" />
            <div className="w-[25%] pb-4 bg-primary mt-5 border border-white rounded-lg z-40">
                <div className="w-full flex justify-end pt-2 pr-2 text-2xl ">
                    <BsX onClick={() => dispatch(setPasswordVerify(false))} className="text-btnColor cursor-pointer" />
                </div>
                <div className="  w-full ">
                    <p className="text-heading text-2xl text-center  "> Password</p>
                </div>
                <div className=" flex-col justify-center items-center px-5 mt-2" >
                    <label className="text-black ms-2 ">Enter your Password here</label>
                    <Input onChange={(e) => SetPassword(e.target.value)} className="bg-green border-none placeholder-header-gradient2  px-2  text-black text-lg mt-1" type="password" />
                </div>
                <div className="flex items-center justify-center ">
                    <button onClick={handleSubmitPassword} className="px-12 py-2 rounded-full text-white bg-btnColor hover:bg-btnColorHover mt-4">save</button>
                </div>
            </div>
        </div>

    )
}


export default VerifyPassword;
import { BsFillCaretLeftFill, BsX } from "react-icons/bs";
import logo from "../assets/images/logo.png";
import walletlogo from "../assets/images/wallet_logo.png";
import { Input } from "antd";
import { AiFillEdit } from "react-icons/ai";
import { BiSolidCopy } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import VerifyPassword from "./VerifyPassword";
import { setNewAccountFields, setPasswordVerify } from "../redux/counter";
import { setOperation } from "../redux/wallet";


const AccountAdd = ({ isNewAccount, accountType }: any) => {
    
  
    const wallet = useSelector((state:RootState)=>state.wallet.data)
    const [accountName,SetAccountName] = useState("")
    const dispatch = useDispatch()

    console.log(accountName)


    const handleAccountCreate = ()=>{
        const accName = accountName ? accountName : `Account ${wallet.accountCount + 1}`
        dispatch(setOperation("Addaccount"))
        dispatch(setPasswordVerify(true))
        dispatch(setNewAccountFields({aountName:accName,accountNumber:wallet.accountCount + 1}))

        // close account modal
        isNewAccount('')
    }

    return (
        <div className="fixed z-10 top-0 right-0 bottom-0 left-0 w-full h-[100vh] bg-bgColor2 bg-opacity-50 flex flex-col pt-5 items-center">
            <img src={walletlogo} alt="logo" />
            <div className="w-[25%] pb-4 bg-primary mt-5 border border-white rounded-lg z-40">
                <div className="w-full flex justify-end pt-2 pr-2 text-2xl ">
                    <BsX onClick={() => isNewAccount('')} className="text-btnColor cursor-pointer" />
                </div>
                <div className="  w-full ">

                    <p className="text-heading text-2xl text-center  ">{accountType === 'add-account' ? 'Add' : 'Import'} Account</p>
                </div>
                {
                    accountType !== 'add-account'
                        ?
                        <div className="bg-bgShade border border-white rounded-xl  px-3 mx-3 mt-5 w-[400px]  justify-center items-center flex-col">

                            <p className="py-2 text-black text-sm leading-5">A malicious network provider can lie about the state of the blockchain and record your network activity. Only add custom networks.</p>
                        </div>
                        :
                        null
                }



                <div className=" flex-col justify-center items-center px-5 mt-2" >
                    <label className="text-black ms-2 ">Enter name of account</label>
                    <Input placeholder={`Account ${wallet.accountCount + 1}`} value={accountName} onChange={(e)=>{SetAccountName(e.target.value)}} className="bg-green border-none px-2  text-black text-lg mt-1" />
                </div>

                <div className="flex items-center justify-center ">
                    {
                        accountType !== 'add-account'
                            ?
                            <button className="px-12 py-2 rounded-full text-white bg-btnColor hover:bg-btnColorHover mt-4">Import</button>
                            :
                            <button onClick={handleAccountCreate} className="px-12 py-2 rounded-full text-white bg-btnColor hover:bg-btnColorHover mt-4">Create</button>
                    }
                </div>

            </div>
        </div>
        


     
    )
}


export default AccountAdd;
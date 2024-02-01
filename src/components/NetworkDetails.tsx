import { BsX } from "react-icons/bs";
import logo from "../assets/images/logo.png";
import walletlogo from "../assets/images/wallet_logo.png";
import { Input } from "antd";
import ethIcon from '../assets/images/Group 55.png';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { setOpenNetworkMenu, walletAddNetwork } from "../redux/wallet";

const NetworkDetails = ({ openNet,exploreNetwork,isEditable }: any) => {


    const dispatch = useDispatch()



    const [FormData,SetFormData] = useState({
        name:"",
        providerURL:"",
        chainId:"",
        coinName:"",
        scanURL:""
    })

const handleChange = (event:any)=>{
    console.log(event.target.value)
    SetFormData(prevData => ({...prevData,[event.target.name]:event.target.value}))
}

useEffect(()=>{

    if (!isEditable){

        SetFormData(exploreNetwork)
    }
},[])

const handleSubmit = (event:any)=>{

event.preventDefault()
    console.log(FormData)
    dispatch(walletAddNetwork(FormData))
    dispatch(setOpenNetworkMenu(false))
    openNet(false)
}

    return (
        <div className="fixed z-10 top-0 right-0 bottom-0 left-0 w-full h-[100vh] bg-bgColor2 bg-opacity-50 flex flex-col pt-5 items-center">

            <img src={walletlogo} alt="logo" />
            <div className="w-[25%] bg-primary mt-5 border border-white rounded-lg z-40">
                <div className="w-full flex justify-end pt-2 pr-2 text-2xl">
                    <BsX onClick={() => openNet("")} className="text-btnColor cursor-pointer" />
                </div>
                <h1 className="text-black text-2xl text-center font-bold">{isEditable ? "Add Network":"Network Details"}</h1>

                <div className="flex justify-center flex-col mt-4 items-center">

<form onSubmit={handleSubmit}>

                    <div className="p-4">
                        <div>
                            <label className="text-black ms-2 font-semibold">Network Name</label>
                            <Input className="bg-green border-none text-black px-2 text-lg mt-1" name={"name"} disabled={!isEditable} value={FormData.name} onChange={(e)=>handleChange(e)} />
                        </div>

                        <div className="mt-2">
                            <label className="text-black ms-2 font-semibold">New RPC URL</label>
                            <Input className="bg-green border-none text-black px-2 text-lg mt-1" name={"providerURL"} disabled={!isEditable} value={FormData.providerURL} onChange={(e)=>handleChange(e)} />
                        </div>

                        <div className="mt-2">
                            <label className="text-black ms-2 font-semibold">Chain ID</label>
                            <Input className="bg-green border-none text-black px-2 text-lg mt-1" name={"chainId"} disabled={!isEditable} value={FormData.chainId} onChange={(e)=>handleChange(e)}/>
                        </div>

                        <div className="mt-2">
                            <label className="text-black ms-2 font-semibold">Currency symbol</label>
                            <Input className="bg-green border-none text-black px-2 text-lg mt-1" name={"coinName"} disabled={!isEditable} value={FormData.coinName} onChange={(e)=>handleChange(e)}/>
                        </div>

                        <div className="mt-2">
                            <label className="text-black ms-2 font-semibold">Block explorer URL <span className="text-btnColor text-sm">(Optional)</span></label>
                            <Input className="bg-green border-none text-black px-2 text-lg mt-1" name={"scanURL"} disabled={!isEditable} value={FormData.scanURL} onChange={(e)=>handleChange(e)} />
                        </div>
                        {
                            isEditable
                                ?
                                <div className="flex justify-evenly items-center mt-4">
                                    <button  onClick={(e)=>handleSubmit(e)}  className="w-32 py-1 rounded-full text-white bg-btnColor hover:bg-btnColorHover">Save</button>
                                    <button onClick={() => openNet("")} className="w-32 py-1 rounded-full text-black card-shadow border border-btnColor text-btnColor hover:bg-btnColorHover hover:text-white">Cancel</button>

                                </div>
                                :
                                null
                            }

                    </div>
            </form>
                </div>

            </div>
        </div>
    )
}

export default NetworkDetails;
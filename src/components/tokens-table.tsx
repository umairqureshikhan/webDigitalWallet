// import { useState } from 'react';
import { BiPlus, BiRevision } from "react-icons/bi";
import TokenItem from "./token-item";
import ActivityItem from "./ActivityItem";
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setImportTokenModal } from '../redux/counter';
import { getWallet } from "../redux/wallet";


const TokensTable = ({ tableHeading }: any) => {
    const dispatch = useDispatch();

    const currentTokens = useSelector((state:RootState)=>state.wallet.currentTokens)
    const activityHistoryData = useSelector((state:RootState)=>state.wallet.txHistory)


    const handleRefresh = () =>{
        dispatch(getWallet())
    }

    return (
        <div className="w-[48%] h-[340px] rounded-xl  flex flex-col items-center p-2 card-shadow bg-opacity-80">
            <div className="flex justify-center">
                <p className="text-heading text-2xl font-bold">{tableHeading}</p>
            </div>
            <div className="w-[94%] h-1 my-2 bg-btnColor"></div>

            <p className="text-heading my-1 ms-4 w-full text-lg font-semibold">{tableHeading=="Tokens" ? "" : activityHistoryData[0]?.date }</p>

            <div className="px-2 w-full max-h-[400px] h-[80%] overflow-x-auto" id="style-4">
                {
                    tableHeading === 'Tokens' ?
                        <>
                            {currentTokens.map((data:any) => {
                                return (
                                    <TokenItem data={data} />
                                )
                            })}
                        </>
                        :
                        <>
                            {
                                activityHistoryData.map((data:any) => {
                                    return (
                                        <ActivityItem data={data} />
                                    )
                                })
                            }
                        </>

                }

            </div>

            <div className="flex justify-between w-full px-4 mt-1">
                {
                    tableHeading === 'Tokens' ?
                        <div className="flex items-center cursor-pointer">
                            <div className="w-4 h-4 border border-btnColor flex justify-center items-center">
                                <BiPlus className="text-btnColor" />
                            </div>
                                <p onClick={() => dispatch(setImportTokenModal(true))} className="text-btnColor ms-2 text-sm">Import Token</p>
                        </div>
                        :
                        <div></div>
                }
                

                <div className="flex items-center cursor-pointer">
                    <div className="w-4 h-4 border border-btnColor flex justify-center items-center">
                        <BiRevision className="text-btnColor" />
                    </div>
                    <p  onClick={handleRefresh} className="text-btnColor ms-2 text-sm">Refresh List</p>
                </div>
            </div>

            <div className="flex justify-between cursor-pointer">

            </div>
        </div>
    )
}


export default TokensTable;
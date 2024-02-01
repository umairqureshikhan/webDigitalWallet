import { Dropdown, MenuProps } from "antd";
import { BsGrid, BsThreeDotsVertical } from "react-icons/bs";
import { formateAddress } from "../services/utils";
import { useDispatch, useSelector } from "react-redux";
import { changeAccount, setAccountDetails, setCurrentAccountNumber } from "../redux/wallet";
import { RootState } from "../redux/store";
import { setOpenAccount } from "../redux/counter";
import Avatar, { genConfig } from 'react-nice-avatar'


const AccountProfiles = ({account,avtar}:any) => {

    
    const dispatch = useDispatch();
    const currentAccount = useSelector((state: RootState) => state.wallet.currentAccount)
    const accountNumber = useSelector((state: RootState) => state.wallet.currentAccountNumber)
    
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className="flex bg-primary p-2 items-center">
                    <div className="border border-btnColor p-1 flex justify-center items-center">
                        <BsGrid className="text-btnColor" />
                    </div>
                    <p onClick={(e) => {e.stopPropagation(); dispatch(setAccountDetails(account))}} className="text-btnColor sm ms-2 underline">Account Details</p>
                </div>
            ),
        }
    ];

    const handleChangeAccount = () =>{
        dispatch(changeAccount(account));
        dispatch(setOpenAccount(false))
        dispatch(setCurrentAccountNumber(account.accountNumber))
    }

    return (
        <div className="w-full h-24 px-3 py-2 cursor-pointer">
            <div onClick={handleChangeAccount} className={currentAccount.address === account.address ? 'w-full px-2 text-black h-full bg-green rounded-lg flex justify-between items-center border-[3px] border-btnColorHover' : 'w-full px-2 text-black h-full bg-green rounded-lg flex justify-between items-center'}>
                
                <div className="flex">             
                    <Avatar className="w-[50px] h-[50px]" {...genConfig(account.address)} />
                    <div className="ms-2">
                        <p>{account.name}</p>
                        <p>{formateAddress(account.address)}</p>
                    </div>
                </div>

                <div className="flex items-center">
                    {/* <div>
                        <p>0.2 Eth</p>
                        <p>220 USD</p>
                    </div> */}

                    <div className="ms-2">
                        <Dropdown menu={{ items }} placement="bottomLeft">
                            <BsThreeDotsVertical className="text-black cursor-pointer" />
                        </Dropdown>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AccountProfiles;
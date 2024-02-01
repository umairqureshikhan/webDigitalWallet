import { Button } from "antd";
import { BsFillArrowDownLeftCircleFill, BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const ActivityItem = ({ data }: any) => {

    const currentNetwork = useSelector((state:RootState)=>state.wallet.currentNetwork)

    const gotoRecipt = ()=>{
        window.open(currentNetwork?.scanURL+"/tx/"+data?.hash, "_blank", "noreferrer");
    }
    return (
        <div className="w-full  my-2 rounded-lg p-4 card-shadow z-10 bg-opacity-80  bg-green">
            <div className="flex justify-between ">
                <div>
                    <div className="flex items-center">
                        {
                            data.action === 'Received' ?
                                <BsFillArrowDownLeftCircleFill className="text-btnColor text-3xl" />
                                :
                                <BsFillArrowUpRightCircleFill className="text-btnColor text-3xl" />

                        }
                        <div>
                            <p className="ms-2 text-black ">{data.action}<span className="text-xs text-btnColor">- {data.date}</span></p>
                            <p className="text-xs text-black font- ms-2 mt-1">{data.status}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-black font-semibold">{data.amount}</p>
                    <Button className=" bg-btnColorHover hover:bg-secondary-dark  rounded-full text-white-1" onClick={gotoRecipt}>Receipt</Button>
                    {/* <p className="text-black mt-1 text-xs font-semibold">120</p> */}
                </div>
            </div>


        </div>
    )
}


export default ActivityItem;
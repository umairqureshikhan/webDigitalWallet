import { BsX } from "react-icons/bs";
import logo from "../assets/images/logo.png";
import walletlogo from "../assets/images/wallet_logo.png";
import { BiSolidCopy } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formateAddress } from "../services/utils";
import { RootState } from "../redux/store";
import { erasePk, setAccountDetails, setOperation } from "../redux/wallet";
import { Tooltip } from "antd";
import Avatar, { genConfig } from "react-nice-avatar";
import QRCode from "react-qr-code";
import { setPasswordVerify } from "../redux/counter";
const AccountDetails = ({ isAccountDetails }: any) => {
  const dispatch = useDispatch();
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const accountDetails = useSelector(
    (state: RootState) => state.wallet.accountDetails
  );
  const pk = useSelector((state: RootState) => state.wallet.esp);

  const [tooltipContent, setTooltipContent] = useState("Copy");
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(accountDetails.address)
      .then(() => setTooltipContent("Copied!"));
    setTimeout(() => {
      setTooltipContent("Copy");
    }, 2000);
  };
  const copyPrivateKeyFor = () => {
    navigator.clipboard.writeText(pk).then(() => setTooltipContent("Copied!"));
    setTimeout(() => {
      setTooltipContent("Copy");
    }, 2000);
  };
  const handleShowcasePrivateKey = () => {
    dispatch(setOperation("showPK"));
    dispatch(setPasswordVerify(true));
    setShowPrivateKey(true);
  };

  const handleCloseModal = () => {
    dispatch(setAccountDetails({}));
    dispatch(erasePk());
  };

  return (
    <div className="fixed z-10 top-0 right-0 bottom-0 left-0 w-full h-[100vh] bg-bgColor2 bg-opacity-50 flex flex-col pt-5 items-center">
      <img src={walletlogo} alt="logo" />
      <div className="w-[22%] h-[65%] pb- bg-primary mt-5 border border-white rounded-lg z-40">
        <div className="w-full flex justify-end pt-2 pr-2 text-2xl ">
          <BsX
            onClick={() => dispatch(setAccountDetails({}))}
            className="text-btnColor cursor-pointer"
          />
        </div>
        <div className="  w-full ">
          <p className="text-heading text-2xl text-center cursor-pointer font-bold ">
            Account Details
          </p>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <Avatar
            className="w-[85px] h-[85px] mt-4"
            {...genConfig(accountDetails.address)}
          />
          <div className="flex w-full justify-center cursor-pointer">
            <span className="text-center  text-black">{accountDetails.name}</span>
            
          </div>
        </div>
        {showPrivateKey ? (
          <div className="flex flex-col justify-center items-center">
            <div className="bg-green p-2 mt-5 flex justify-center rounded-md items-center">
              <p className="text-black">
                {formateAddress(accountDetails.address)}
              </p>
              <Tooltip title={tooltipContent}>
                <BiSolidCopy
                  className="text-btnColor mx-2 cursor-pointer"
                  onClick={copyToClipboard}
                />
              </Tooltip>
            </div>
            <div className=" w-full px-4 py-3 cursor-pointer">
              <span className="text-black">private key for</span>{" "}
              <span className="text-btnColor  ">{accountDetails.name}</span>
            </div>
            <div className="bg-green  h-[50px] w-[90%]  mt-3 flex justify-between rounded-md items-center px-3">
              <span className="text-black text-center w-full cursor-pointer ">
                {formateAddress(pk)}
              </span>

              <span>
                <Tooltip title={tooltipContent}>
                  <BiSolidCopy
                    className="text-btnColor cursor-pointer"
                    onClick={copyPrivateKeyFor}
                  />
                </Tooltip>
              </span>
            </div>

            <div className="flex items-center justify-center ">
              <button
                onClick={() => handleCloseModal()}
                className="px-12 py-2  rounded-full text-white border border-white bg-btnColor hover:bg-btnColorHover mt-5"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="w-[110px] h-[90px] p-1 mt-3 relative">
              <QRCode
                style={{ height: "100%", maxWidth: "100%", width: "100%" }}
                value={accountDetails.address}
              />
            </div>
            <div className="bg-green p-2 mt-3 flex justify-center rounded-md items-center">
              <p className="text-black cursor-pointer">
                {formateAddress(accountDetails.address)}
              </p>
              <Tooltip title={tooltipContent}>
                <BiSolidCopy
                  className="text-btnColor mx-2 cursor-pointer"
                  onClick={copyToClipboard}
                />
              </Tooltip>
            </div>
            <div className="flex items-center justify-center ">
              <button
                onClick={() => {
                  handleShowcasePrivateKey();
                }}
                className="px-6 py-3 rounded-full text-white border border-white bg-btnColor hover:bg-btnColorHover mt-4"
              >
                Show private key
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
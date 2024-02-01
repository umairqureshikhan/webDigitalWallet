import transactionimage from "../../assets/images/Group 216.png";
import contactimage from "../../assets/images/Group 217.png";
import netwokimage from "../../assets/images/Group 215.png";

const Transaction = () => {
  return (
    <div className="flex   h-[80vh] animated-circle-landing-page">
      <div className="flex justify-around  w-full ">
        <div className="w-[25%] ">
          <img src={transactionimage} alt="transactionimages" />
          <p className="mt-8">
            Seamlessly transact between native currency and ERC20 tokens
            sending and receiving made effortless
          </p>
        </div>
        <div className="w-[25%]">
          <img src={contactimage} alt="transactionimages" />
          <p className="mt-8">
            Create a multitude of secure accounts within one wallet your
            personalized vault for diversified assets
          </p>
        </div>
        <div className="w-[25%]">
          <img src={netwokimage} alt="transactionimages" />
          <p className="mt-8">
            Expand your horizons add a plethora of Ethereum-compatible networks
            with ease
          </p>
        </div>
      </div>
    </div>
  );
};

export default Transaction;

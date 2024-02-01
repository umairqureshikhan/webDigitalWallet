import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { incrementStep, setPasswordVerify } from "../redux/counter";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react"
import { createWallet, generateWallet } from "../services/blockchain";
import PhraseBox from "./PhraseBox";
import { BiSolidCopy } from "react-icons/bi"
import { RootState } from "../redux/store";
import { Input, Tooltip } from 'antd';
import { setIMporteddPhrase, setOperation, walletImport } from '../redux/wallet';






interface IWallet {
  "address": String,
  "phrase": Array<String>,
  "privateKey": String
}



function Recovery() {
  const importWallet = useSelector((state: RootState) => state.wallet.importWallet)

  const [tooltipContent, setTooltipContent] = useState('Copy');
 
  const dispatch = useDispatch();
  const User = useSelector((state: RootState) => state.wallet)
  const [wallet, setWallet] = useState<IWallet>({
    "address": "",
    "phrase": [],
    "privateKey": ""
  })

  const [checkPhrase, setCheckPhrase] = useState(false)
  const [confirmWord, setConfirmWord]: any = useState({})
  const [phrase, setPhrase]: any = useState("") 
  const [warning, setWarning] = useState(false)



  useEffect(() => {
    if(importWallet){
      setCheckPhrase(true);
    }else{
      setCheckPhrase(false);
    }
  }, [importWallet])


  const revealPhrase = () => {

    const walletObj = generateWallet();
    console.log(walletObj)
    setWallet(walletObj)
  }


  const ConfirmPhrase = async () => {
    console.log(confirmWord)

    if (importWallet) {
      //Todo:  if word not exist in confirmWord eror produce
      const listOfWords = phrase.split(",")
      if (listOfWords.length === 12) {
        
        console.log(importWallet) 
        dispatch(setIMporteddPhrase(listOfWords))
        dispatch(setOperation("importwallet"))
        dispatch(setPasswordVerify(true)) 
      }
      
    
    }
    else{

      if (confirmWord[0] == wallet.phrase[0] && confirmWord[4] == wallet.phrase[4] && confirmWord[8] == wallet.phrase[8]) {
        
        // apply loader here
        console.log("Confirmed")
        const iscreated = await createWallet(User.username, User.password, wallet)
        if (iscreated) {
          

          dispatch(incrementStep(3));
        }
        return
        
      }
    }  
      
      setWarning(true)
      
  


  }


  const copyPhrase = () => {
    navigator.clipboard.writeText(wallet.phrase.join(","))
    setTooltipContent('Copied!');
  
    setTimeout(() => {
      setTooltipContent('Copy');
    }, 2000); // Reset after 2 seconds (adjust the duration as needed)
  }


  return (
    <>
      <div className="w-[50%] relative bg-primary rounded-2xl pb-2 card-shadow z-10 bg-opacity-80">
        {/* top step Counter Container */}
        <div className="flex justify-center items-center absolute -top-5 w-full">
          <div className="bg-transparant rounded-full flex justify-center items-center h-10 w-10 ">
            <div className="bg-btnColorHover rounded-full flex justify-center items-center h-7 w-7 ">
              <p className="text-primary">1</p>
            </div>
          </div>

          {/* Divider Line */}
          <div className={wallet.address || importWallet ? 'w-16 h-1 rounded-full bg-btnColor' : 'w-16 h-1 rounded-full bg-btnColor opacity-40'}></div>

          <div className="bg-transparant rounded-full flex justify-center items-center h-10 w-10 ">
            <div className={wallet.address || importWallet ? 'bg-btnColorHover rounded-full flex justify-center items-center h-7 w-7' : 'bg-btnColorHover rounded-full flex justify-center items-center h-7 w-7 opacity-30'}>
              <p className="text-primary">2</p>
            </div>
          </div>

          {/* Divider Line */}
          <div className={checkPhrase ? 'w-16 h-1 rounded-full bg-btnColor' : 'w-16 h-1 rounded-full bg-btnColor opacity-40'}></div>

          <div className="bg-transparant rounded-full flex justify-center items-center h-10 w-10 ">
            <div className={checkPhrase ? 'bg-btnColorHover rounded-full flex justify-center items-center h-7 w-7' : 'bg-btnColorHover rounded-full flex justify-center items-center h-7 w-7 opacity-30'}>
              <p className="text-primary">3</p>
            </div>
          </div>
        </div>

        {/* Steps label */}
        <div className="mt-6 mx-auto w-1/2 flex justify-evenly  ">
          <p className="text-xs text-black1">Create Password</p>
          <p className="text-xs text-black1 opacity-70">Secure wallet</p>
          <p className="text-xs text-black1 opacity-70">
            Confirm secret
            <br />
            recovery phrase
          </p>
        </div>

        {/* Main Section */}
        <div className="mx-8">
          {/* Heading Section */}
          <h1 className="text-4xl text-heading font-bold text-center">
            Write down your Secret Recovery Phrase
          </h1>
          <p className="mt-3 ms-4 w-[80%] text-center text-black1">
            Write down this 12-word Secret Recovery Phrase and save it in a
            place that you trust and only you can access.
          </p>

          {/* Tips Section */}
          {
            !importWallet ?
            <div className="w-3/5 mx-auto my-1 text-black1">
              <h6 className="ml-1">Tips:</h6>
              <ul className="ml-6 list-disc">
                <li className="text-btnColor">
                  <span className="text-black1">Save in a password manager</span>
                </li>
                <li className="text-btnColor">
                  <span className="text-black1">Store in a safe deposit box</span>
                </li>
                <li className="text-btnColor">
                  <span className="text-black1">
                    Write down and store in multiple secret places
                  </span>
                </li>
              </ul>
            </div>
            :
              <div className='w-[82%] mx-auto flex my-2'>
                <Input onChange={(e)=>{setPhrase(e.target.value)}} value={phrase} className="bg-green border-none placeholder-gray px-2 text-black text-lg mt-1" type='text' placeholder='cake,wear,find,word,less,save,good,tips,place,only,keep,name' />
              </div>
          }
          
        </div>

        {/* Password Section */}
        <div className="w-3/4 mx-auto rounded-lg bg-gray bg-opacity-70 relative">
          {/* parent */}

          {!checkPhrase && wallet.phrase.length &&
            <div className="w-full flex justify-end p-2">
            <Tooltip title={tooltipContent}>
              <BiSolidCopy className="text-btnColorHover cursor-pointer" onClick={copyPhrase} />
            </Tooltip>
          </div>
          }
 
         {!importWallet && <PhraseBox wallet={wallet} checkPhrase={checkPhrase} confirmWord={confirmWord} setConfirmWord={setConfirmWord} />}
          {/* Overflow Container */}
          {!wallet.address && !importWallet &&
            <div className="w-full flex flex-col justify-center items-center h-full top-0 absolute rounded-lg backdrop-blur-sm bg-bgShade/50 bg-opacity-50">
              <AiOutlineEye className="text-black1" />
              <p className="text-black1">Save in a password manager</p>
            </div>
            }
        </div>

        {/* Button */}
        <div className="flex justify-center flex-col items-center">

          {warning && <p> Wrong Phrase, Please put the right words</p>}

          {checkPhrase ?
            <button
            disabled={!phrase && importWallet}
              onClick={() => { ConfirmPhrase() }}
              className={!phrase  && importWallet? 'bg-green rounded-full w-48 p-3 text-white-1 mt-4' :'bg-btnColor rounded-full w-48 p-3 text-white-1 mt-4 hover:bg-btnColorHover'}
            >
              Confirm
            </button>

            :
            wallet.phrase.length ?
              <button
                onClick={() => { setCheckPhrase(true) }}
                className="bg-btnColor rounded-full w-48 p-3 text-white-1 mt-4 hover:bg-btnColorHover"
              >
                Next
              </button>
              :
              <button
                onClick={revealPhrase}
                className="bg-btnColor rounded-full w-48 p-3 text-white-1 mt-4 hover:bg-btnColorHover"
              >
                Reveal Recovery Phrase
              </button>
          }
          {/* <button className="bg-btnColor rounded-full w-48 p-3 text-white-1 mt-4 hover:bg-btnColorHover">Import Wallet</button> */}
        </div>
      </div>
    </>
  );
}

export default Recovery;
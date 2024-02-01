import alliconimage from '../../assets/images/Group 270.png'


const TheOnlyWallet = () => {
    return (
        <>
            <div className="flex justify-center items-center w-full h-[100vh] relative">
                <div className="bg-bgShade rounded-xl border-white w-full py-2 animated-circle-landing-page-theonlywallet">
                    <div className="flex flex-col items-center  p-10">
                        <h1 className="text-5xl font-bold">The only Wallet you'll never need</h1>
                        <p className="font-semibold p-5 text-2xl"> 50+ Network supported, swap between 1000s of assets</p>


                    </div>
                    <div className="flex justify-center">
                        <img className="h-[65vh] " src={alliconimage} alt="" />


                    </div>


                </div>


            </div>


        </>
    )
}

export default TheOnlyWallet;
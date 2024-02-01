import { Routes, Route } from "react-router-dom";
import Demo from "../pages/demo";
import Home from "../pages/Home";
import WalletApp from "../pages/WalletApp";
import ProtectedRoute from "./ProtectedRoute";
import Addnetwork from "../pages/AddNetwork";
import LandingPage from "../pages/LandingPage";
import { BallTriangle } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RingLoader } from 'react-spinners';

function AppRouter() {
  const loading = useSelector((state: RootState) => state.wallet.loading)
  const loaderCount = useSelector((state: RootState) => state.wallet.loadingCounter)


  return (
    <div className="">
      {
        (loading || loaderCount > 0) ?
          <div className="absolute top-0 right-0 bottom-0 left-0 w-full bg-bgShade bg-opacity-60 flex justify-center items-center z-50">
        <RingLoader
          color="#5736d6"
          size={120}
          speedMultiplier={1}
        />
          </div>
         :
        null
      } 
      
      <Routes>

        <Route path="/home" element=
        {
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
          
        } />
        
        <Route path="/"   element=
        {
        <ProtectedRoute>
          <LandingPage/>
        </ProtectedRoute>
          
        }  />
        {/* <Route path="/demo" Component={Demo} /> */}
        <Route path="/app" Component={WalletApp} />
        {/* <Route path="/add-network" Component={Addnetwork} /> */}

        {/* <Route path="/sign-up" Component={SignUp} />
        <Route path="/inbox" Component={Inbox} />
        <Route path="/home" Component={Home} />
        <Route path="/wallet" Component={Wallet} />
        <Route path="/create" Component={Create} /> */}
      </Routes>
    </div>
  );
}

export default AppRouter;

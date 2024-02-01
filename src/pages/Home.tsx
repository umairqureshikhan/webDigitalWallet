import { useSelector } from "react-redux";
import MainComponenet from "../components/main";
import { RootState } from "../redux/store";
import SignUp from "../components/sign-up";
import Recovery from "../components/recovery";
import CongrateScreen from "../components/CongrateScreen";
import WalletApp from "./WalletApp";

function Home() {
  const step = useSelector((state: RootState) => state.user.step);

  const showComponent = () => {
    switch (step) {
      case 0:
        return <MainComponenet />;
      case 1:
        return <SignUp />;
      case 2:
        return <Recovery />;
      case 3:
        return <CongrateScreen />;
      case 4:
          return <WalletApp />;
      default:
        return <MainComponenet />;
        // break;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[90vh] m-4">
        {showComponent()}
      </div>
    </>
  );
}
// Test new branch

export default Home;

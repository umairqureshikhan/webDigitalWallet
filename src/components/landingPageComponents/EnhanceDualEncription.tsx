import Group from "../../assets/images/Group 210.png";

const EnhancedDualEncription = () => {
  return (
    <div className="flex justify-center items-center  w-full h-[100vh] relative">
      <div className="flex justify-between w-full animated-circle-landing-page-Enhanceddual">
        <div className="w-[40%]">
          <h1 className="text-5xl font-bold mt-20 ">
            Enhanced Dual Encription
          </h1>
          <p className="mt-5 text-xl">
            Enhanced Dual Encryption represents a groundbreaking innovation
            ensuring fortified protection for user accounts. This feature
            employs a dual-layered encryption method, securing account
            credentials in a manner that shields them from potential
            vulnerabilities both at the server end and the user's side.
          </p>
        </div>
        <div className="w-[40%]">
          <img src={Group} alt="" />
        </div>
      </div>
    </div>
  );
};
export default EnhancedDualEncription;

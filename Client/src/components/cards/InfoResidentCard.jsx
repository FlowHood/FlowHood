import React from "react";
import HomeInformation from "../../assets/images/ic_home_information.svg";

const InfoResidentCard = ({ homeIdentifier, homeName, homeAddress, homeMembers }) => {
  return (
    <div className="flex w-full max-w-72 flex-col items-center justify-center rounded-[0.8125rem] border-[0.888px] border-[#eff0f6] bg-[#f2f1ff]/[.30] p-3 pl-[1.3125rem] pr-[1.3125rem]">
      <div className="flex items-center gap-2">
        <div className="flex flex-shrink-0 items-center justify-center max-w-20">
          <img src={HomeInformation} alt="Home information" />
        </div>
        <div className="flex flex-col items-start justify-center text-start">
          <p className="text-[.9375rem] font-semibold text-black">
            {"Tu hogar"}
          </p>
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="text-xs text-royal-amethyst font-medium">{ homeName }</p>
            <p className="text-[9.474px] font-light text-[#495865] leading-4">
                {homeAddress}
                <br />
                <span className="text-[8px] text-light-gray">
                    {homeMembers + " integrantes"} 
                </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoResidentCard;

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

export const InfoAllHousesCard = ({ totalHouses, totalResidents, houseDetails }) => {
  return (
    <div className="flex w-full max-w-72 flex-col items-center justify-center rounded-[0.8125rem] border-[0.888px] border-[#eff0f6] bg-[#f2f1ff]/[.30] p-3 pl-[1.3125rem] pr-[1.3125rem]">
      <div className="flex items-center gap-2">
        <div className="flex flex-shrink-0 items-center justify-center max-w-20">
          <img src={HomeInformation} alt="Home information" />
        </div>
        <div className="flex flex-col items-start justify-center text-start">
          <p className="text-[.9375rem] font-semibold text-black">
            {"Tus hogares"}
          </p>
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="text-xs text-royal-amethyst font-medium">
              {"Total de casas: " + totalHouses}
            </p>
            <p className="text-[9.474px] font-light text-[#495865] leading-4">
              {"Total de residentes: " + totalResidents}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 w-full">
        {houseDetails.map(house => (
          <div key={house.id} className="flex flex-col items-start justify-center mt-2 w-full">
            <p className="text-xs font-medium text-royal-amethyst">
              {"Dirección: " + house.address}
            </p>
            <p className="text-[9.474px] font-light text-[#495865] leading-4">
              {"Activo: " + (house.active ? "Sí" : "No")}
              <br />
              <span className="text-[8px] text-light-gray">
                {"Responsable: " + house.responsible.name}
              </span>
              <br />
              <span className="text-[8px] text-light-gray">
                {"Email: " + house.responsible.email}
              </span>
              <br />
              <span className="text-[8px] text-light-gray">
                {"Residentes: " + house.residents.length}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


export const NoHousesCard = () => {
  return (
    <div className="flex w-full max-w-72 flex-col items-center justify-center rounded-[0.8125rem] border-[0.888px] border-[#eff0f6] bg-[#f2f1ff]/[.30] p-3 pl-[1.3125rem] pr-[1.3125rem]">
      <div className="flex items-center gap-2">
        <div className="flex flex-shrink-0 items-center justify-center max-w-20">
          <img src={HomeInformation} alt="No Home Information" />
        </div>
        <div className="flex flex-col items-start justify-center text-start">
          <p className="text-[.9375rem] font-semibold text-black">
            {"No tienes casas asociadas"}
          </p>
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="text-xs text-royal-amethyst font-medium">{"N/A"}</p>
            <p className="text-[9.474px] font-light text-[#495865] leading-4">
              {"No hay direcciones disponibles"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default InfoResidentCard;

import React from "react";
import { ClockIcon } from "../Icons";
import { getCurrentTime } from "../../lib/utils";

const InfoScheduleCard = ({ turno }) => {
  return (
    <div className="flex w-full max-w-[14.9375rem] flex-col items-center justify-center rounded-[0.8125rem] border-[0.888px] border-[#eff0f6] bg-[#f2f1ff]/[.30] p-3 pl-[1.3125rem] pr-[1.3125rem]">
      <div className="flex items-center gap-2">
        <div className="flex flex-shrink-0 items-center justify-center">
          <ClockIcon width={44} height={44} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-[.9375rem] font-semibold text-[#495865]">
            {turno}
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-xs text-[#495865]">{getCurrentTime()}</p>
            <p className="text-[9.474px] font-light text-[#495865]">
              Horario: 9:00 am a 6:00 pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoScheduleCard;

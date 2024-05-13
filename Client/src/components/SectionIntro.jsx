import React from "react";
import { cn } from "../lib/utils";

const SectionIntro = ({
  title,
  titleAs: TitleComponent = "h1",
  subtitle = null,
  subtitleAs: SubtitleComponent = "p",
  generalClassName = "",
}) => {
  return (
    <div className={cn("py-8 leading-[normal] text-black", generalClassName)}>
      <TitleComponent className="text-[2rem] font-semibold">
        {title}
      </TitleComponent>
      {subtitle && (
        <SubtitleComponent className="mt-3 font-light">
          {subtitle}
        </SubtitleComponent>
      )}
    </div>
  );
};

export default SectionIntro;

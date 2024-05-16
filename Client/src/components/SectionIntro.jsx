import React from "react";
import { cn } from "../lib/utils";

const SectionIntro = ({
  title,
  titleAs: TitleComponent = "h1",
  subtitle = null,
  subtitleAs: SubtitleComponent = "p",
  generalClassName = "",
  small = false,
}) => {
  const titleSize = small ? "text-3xl" : "text-[2rem]";
  return (
    <div className={cn("py-8 leading-[normal] text-black", generalClassName)}>
      <TitleComponent className={cn("font-semibold", titleSize)}>
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

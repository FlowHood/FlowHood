import React from "react";
import Button from "../components/buttons/Button";
import SectionIntro from "../components/SectionIntro";
/* import { Link } from "react-router-dom";*/
import NotWifiImage from "../assets/images/not_wifi.svg";

const PageNotWifi = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-8 text-center">
      <img src={NotWifiImage} alt="not wifi connection" width={250} className=".h-auto  " />
      <SectionIntro
        title="¡Oh, no!"
        subtitle="Al parecer no tienes conexión a Internet"
        text="Intentalo más tarde"
        generalClassName="max-w-[30ch]"
      />

{/*       <Button as={Link} to="/home" className="mt-5">
 */}
      <Button  className="mt-5">
        Regresar a Inicio
      </Button>
    </main>
  );
};

export default PageNotWifi;
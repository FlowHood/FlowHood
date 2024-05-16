import React from "react";
import Button from "../components/buttons/Button";
import SectionIntro from "../components/SectionIntro";
import { Link } from "react-router-dom";
import NotFondImage from "../assets/images/not_found.svg";

const PageNotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-8 text-center">
      <img src={NotFondImage} alt="" width={250} height={100} />
      <SectionIntro
        title="¡Oh, no!"
        subtitle="Al parecer algo se ha perdido. Seguiremos buscandolo."
        generalClassName="max-w-[30ch]"
      />
      <Button as={Link} to="/home" className="mt-5">
        Regresar al Inicio
      </Button>
    </main>
  );
};

export default PageNotFound;

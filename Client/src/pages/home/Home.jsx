import React from "react";
import { Link } from "react-router-dom";

/*Icons*/

/*Components*/
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import BlockOption from "../../components/BlockOption/BlockOption";
import { MdQrCode2 } from "react-icons/md";

const Home = () => {
  return (
    <div className="bg-white flex min-h-svh flex-1 items-center flex-col justify-center py-12 sm:px-6 lg:px-8">
      <NavigationBar isOwner={false} />
      <BlockOption
        to={"#"}
        textDescription={"Registro de entradas"}
        icon={<MdQrCode2 />}
      />
    </div>
  );
};

export default Home;

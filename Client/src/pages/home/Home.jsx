import React from "react";
import { Link } from "react-router-dom";
import { TableComponent } from "../../components/table/GeneralTable";
/*Icons*/

/*Components*/
import BlockOption from "../../components/BlockOption/BlockOption";
import { MdQrCode2 } from "react-icons/md";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

const Home = () => {
  return (
    <div className="flex min-h-svh flex-1 flex-col items-center justify-center bg-white py-12 sm:px-6 lg:px-8">
      <TableComponent />
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";

/*Icons*/

/*Components*/
import NavigationBar from "../../components/NavigationBar/NavigationBar";

const Home = () => {
  return (
    <div className="bg-white flex min-h-svh flex-1 items-center flex-col justify-center py-12 sm:px-6 lg:px-8">
      <NavigationBar isOwner={false} />
    </div>
  );
};

export default Home;

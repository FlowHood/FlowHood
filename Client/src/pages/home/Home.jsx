import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/buttons/Button";
import { VIEWS } from "../../lib/views";

const Grid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {Object.keys(VIEWS).map((viewKey) => (
        <Button 
          key={viewKey} 
          as={Link} 
          to={VIEWS[viewKey]} 
          className="mt-5 flex justify-center items-center w-full p-2 bg-blue-500 text-white rounded-lg"
        >
          {viewKey.replace(/([A-Z])/g, " $1").trim()}
        </Button>
      ))}
    </div>
  );
};


const Home = () => {
  return (
    <>
      <Grid />
    </>
  );
};

export default Home;

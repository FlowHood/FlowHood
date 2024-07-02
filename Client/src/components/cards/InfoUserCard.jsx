import React from "react";
import { useAuth } from "../../context/AuthContext";
import { capitalizeWords } from "../../lib/utils";

const InfoUserCard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user information available.</p>;
  }

  return (
    <div className="flex items-center gap-4">
      <UserComponent picture={user.picture} />
      <div className="hidden md:block">
        <p className="text-[1.1875rem] font-semibold leading-[normal] text-[#0c1522]">
          {capitalizeWords(user.name)}
        </p>
        <p className="text-[9.838px] leading-[normal] text-[#9baab7]">
          {user.email.toLowerCase()}
        </p>
      </div>
    </div>
  );
};

const UserComponent = ({ picture }) => {
  return (
    <div className="aspect-square h-11 w-11 rounded-full border-2 border-gray-200 bg-red-100">
      <img src={picture} alt="User" className="rounded-full object-cover" />
    </div>
  );
};

export default InfoUserCard;

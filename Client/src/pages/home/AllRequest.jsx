import React from "react";
import UserAllRequest from "../../components/user/UserAllRequest";
import UserLayout from "../../components/user/UserLayout";

export default function AllRequest() {
  return (
    <UserLayout showLogout={false}>
      <UserAllRequest />
    </UserLayout>
  );
}

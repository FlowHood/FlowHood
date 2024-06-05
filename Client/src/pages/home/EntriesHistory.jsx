import React from "react";
import UserEntriesHistory from "../../components/user/UserEntriesHistory"
import UserLayout from "../../components/user/UserLayout";

export default function AllEntries() {
  return (
    <UserLayout showLogout={false}>
      <UserEntriesHistory/>
    </UserLayout>
  );
} 
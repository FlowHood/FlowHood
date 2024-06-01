import React from "react";

import UserLayout from "../../components/user/UserLayout";
import UserScanQR from "../../components/user/UserScanQR";

export default function ScanQR() {
  return (
    <UserLayout>
      <UserScanQR />
    </UserLayout>
  );
}

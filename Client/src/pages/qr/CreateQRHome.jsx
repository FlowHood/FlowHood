import React from "react";

import UserLayout from "../../components/user/UserLayout";
import UserCreateQR from "../../components/user/UserCreateQR";

export default function CreateQRHome({ qrInformation = "123" }) {
  //TODO: handle qr code generation
  return (
    <UserLayout>
      <UserCreateQR qrInformation={qrInformation} />
    </UserLayout>
  );
}

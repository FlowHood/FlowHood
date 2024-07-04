import React from "react";

import UserLayout from "../../components/user/UserLayout";
import UserCreateQR from "../../components/user/UserCreateQR";
import { useAuth } from "../../context/AuthContext";

export default function CreateQRHome({ qrInformation = "123" }) {
  const { user } = useAuth();

  if (user.houses && user.houses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-center text-2xl font-semibold">
          No tienes casas asociadas
        </h1>
        <p className="text-center">
          Para poder crear un código QR debes tener una casa asociada a tu
          cuenta, o bien, ser invitado a una casa.
        </p>
      </div>
    );
  }

  //TODO: handle qr code generation
  return (
    <UserLayout>
      <UserCreateQR qrInformation={qrInformation} />
    </UserLayout>
  );
}

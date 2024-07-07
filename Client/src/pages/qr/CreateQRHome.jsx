import React from "react";

import UserLayout from "../../components/user/UserLayout";
import UserCreateQR from "../../components/user/UserCreateQR";
import { useAuth } from "../../context/AuthContext";
import { ROL } from "../../lib/rol";
import SecurityCreateQR from "../../components/user/SecurityCreateQR";

export default function CreateQRHome({ qrInformation = "123" }) {
  const { user, roles } = useAuth();

  if (
    user.houses &&
    user.houses.length === 0 &&
    user.admHouses.length === 0 &&
    !user.roles.find((role) => role.id === ROL.VISITOR) &&
    !user.roles.find((role) => role.id === ROL.ADMIN)
  ) {
    console.log("User has no houses");
    console.log("user.houses =>", user.houses);
    console.log("user.admHouses =>", user.admHouses);
    console.log("user.roles =>", user.roles);

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

  return (
    <UserLayout>
      {roles.includes(ROL.VIGILANT) ||
      roles.includes(ROL.ADMIN) ||
      roles.includes(ROL.OWNER) ? (
        <SecurityCreateQR qrInformation={qrInformation} />
      ) : (
        <UserCreateQR qrInformation={qrInformation} />
      )}
    </UserLayout>
  );
}

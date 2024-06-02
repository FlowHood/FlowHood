import React, { useState } from "react";
import { MdArrowBackIos, MdWidthFull } from "react-icons/md";
import codeQR from "../../assets/images/qr.svg";
import { Link } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import LogoutButton from "../../components/buttons/LogoutButton";
import { LogoInitialsIcon } from "../../components/Icons";
import QrReader from "react-qr-scanner";
import UserLayout from "../../components/user/UserLayout";
import UserScanQR from "../../components/user/UserScanQR";

export default function ScanQR() {
  return (
    <UserLayout>
      <UserScanQR />
    </UserLayout>
  );
}

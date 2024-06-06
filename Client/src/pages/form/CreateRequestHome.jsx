import React from "react";
import UserLayout from "../../components/user/UserLayout";
import FormRequest from "../../components/user/formRequest/FormRequest";

export default function CreateRequestHome() {
  return (
    <UserLayout showLogout={false}>
      <FormRequest />
    </UserLayout>
  );
}

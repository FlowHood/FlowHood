export const ROL = {
  VISITOR: "VST",
  OWNER: "ECG",
  ADMIN: "ADM",
  VIGILANT: "VGT",
  RESIDENT: "RST",
};

export function getRol(rol) {
  const currentRol = {
    VST: "VST",
    ECG: "ECG",
    ADM: "ADM",
    VGT: "VGT",
    RST: "RST",
  };
  return currentRol[rol] || "NOROL";
}

export function isAuthorized(rol, roles) {
  return roles.includes(getRol(rol));
}
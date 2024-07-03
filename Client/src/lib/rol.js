export const ROL = {
  VISITOR: "VST",
  OWNER: "ECG",
  ADMIN: "ADM",
  VIGILANT: "VGT",
  RESIDENT: "RST",
};

export const getHighestPriorityRole = (roles) => {
  const priority = {
    ADM: 4, // mas importante
    VGT: 3,
    ECG: 2,
    RST: 1,
    VST: 0, // menos importante
  };
  let highestRole = "VST";
  let highestPriority = -1;
  roles.forEach((role) => {
    if (priority[role.id] > highestPriority) {
      highestRole = role.id;
      highestPriority = priority[role.id];
    }
  });
  return highestRole;
};

export const getRoleDescription = (roleCode) => {
  const roleMapping = {
    VST: "visitor",
    ECG: "owner",
    ADM: "administrator",
    VGT: "vigilant",
    RST: "resident"
  };
  return roleMapping[roleCode] || roleCode;
};

export const getRolesDescription = (roles) => {
  return roles.map((role) => getRoleDescription(role));
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
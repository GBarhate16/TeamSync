// import { PermissionType, Permissions } from "../enums/role.enum";
// import { UnauthorizedException } from "./appError";
// import { RolePermissions } from "./role-permission";

// export const roleGuard = (
//   role: keyof typeof RolePermissions,
//   requiredPermissions: PermissionType[]
// ) => {
//   const permissions = RolePermissions[role];
//   // If the role doesn't exist or lacks required permissions, throw an exception

//   const hasPermission = requiredPermissions.every((permission) =>
//     permissions.includes(permission)
//   );

//   if (!hasPermission) {
//     throw new UnauthorizedException(
//       "You do not have the necessary permissions to perform this action"
//     );
//   }
// };


import { PermissionType } from "../enums/role.enum";
import { UnauthorizedException } from "./appError";
import { RolePermissions } from "./role-permission";

export const roleGuard = (
  role: keyof typeof RolePermissions,
  requiredPermissions: PermissionType[]
) => {
  const permissions = RolePermissions[role];

  if (!permissions || !Array.isArray(permissions)) {
    throw new UnauthorizedException(`Invalid role or permissions not defined for role: ${role}`);
  }

  const hasPermission = requiredPermissions.every((permission) =>
    permissions.includes(permission)
  );

  if (!hasPermission) {
    throw new UnauthorizedException(
      "You do not have the necessary permissions to perform this action"
    );
  }
};

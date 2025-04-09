import { PermissionsType } from "../enums/role.enum";

declare namespace Express {
  interface User {
    _id: string; // User ID
    email: string; // User Email
    role: PermissionsType; // Role should match PermissionsType from enums
  }

  interface Request {
    user?: User; // Extend req object to include user
  }
}
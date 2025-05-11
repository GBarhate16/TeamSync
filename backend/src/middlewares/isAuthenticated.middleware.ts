// import { NextFunction, Request, Response } from "express";
// import { UnauthorizedException } from "../utils/appError";

// const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//   if (!req.user || !req.user._id) {
//     throw new UnauthorizedException("Unauthorized. Please log in.");
//   }
//   next();
// };

// export default isAuthenticated;


import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/appError";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  console.log("Checking authentication:");
  console.log("Session:", req.session);
  console.log("Is authenticated:", req.isAuthenticated());
  console.log("User:", req.user);
  
  if (!req.user || !req.user._id) {
    throw new UnauthorizedException("Unauthorized. Please log in.");
  }
  next();
};

export default isAuthenticated;
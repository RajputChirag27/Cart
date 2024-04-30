import { Response } from "express";

export interface AuthenticatedResponse extends Response {
    user?: any; // Define the user property on the Request object
  }
import { User } from '@prisma/client'; // Adjust based on your actual User model

declare module 'express' {
  interface Request {
    user?: User; // Adjust this to match your User type from Prisma or elsewhere
  }
}
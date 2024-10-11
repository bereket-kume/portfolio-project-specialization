// src/express.d.ts
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            rawBody?: string; // Add this line
        }
    }
}

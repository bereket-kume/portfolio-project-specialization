import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): JwtPayload => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);
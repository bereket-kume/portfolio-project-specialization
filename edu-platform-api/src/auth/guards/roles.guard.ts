import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the required roles from the metadata (which could be multiple roles)
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    
    // If no roles are specified for the route, allow access (public routes)
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Extract the user from the request
    const { user } = context.switchToHttp().getRequest();

    // Check if the user has at least one of the required roles
    return requiredRoles.includes(user.role);
  }
}

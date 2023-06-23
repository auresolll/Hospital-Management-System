import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserType } from 'src/constants/enums';
import { ROLE_KEY } from 'src/decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    /**
     *
     */
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRole = this.reflector.getAllAndOverride<UserType[]>(
            ROLE_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRole) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        return requiredRole.some((role) => user.role === role);
    }
}

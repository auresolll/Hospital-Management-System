import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Role } from './role.decorator';
import { RoleGuard } from 'src/guards/role.guard';

export const Authorize = (...args: string[]) => {
    return applyDecorators(Role(...args), UseGuards(JwtAuthGuard, RoleGuard));
};

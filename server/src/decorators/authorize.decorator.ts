import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';
import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { Role } from './role.decorator';

export const Authorize = (...args: string[]) => {
    return applyDecorators(Role(...args), UseGuards(JwtAuthGuard, RoleGuard));
};

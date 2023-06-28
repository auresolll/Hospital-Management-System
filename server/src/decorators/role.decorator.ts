import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';
export const Role = (...args: string[]) => SetMetadata(ROLE_KEY, args);

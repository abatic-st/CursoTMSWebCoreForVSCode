import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../app/entities/user.entity';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user || {};
});
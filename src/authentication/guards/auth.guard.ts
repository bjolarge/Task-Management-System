// import {
//     CanActivate,
//     ExecutionContext,
//     Injectable,
//     UnauthorizedException,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';

// import { Request } from 'express';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private jwtService: JwtService, private readonly configService: ConfigService) {}

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const token = this.extractTokenFromHeader(request);
//         if (!token) {
//             throw new UnauthorizedException();
//         }
//         try {
//             const payload = await this.jwtService.verifyAsync(
//                 token,
//                 {
//                     secret: this.configService.get('JWT_SECRET')
//                 }
//             );
//             // 💡 We're assigning the payload to the request object here
//             // so that we can access it in our route handlers
//             request['user'] = payload;
//         } catch {
//             throw new UnauthorizedException();
//         }
//         return true;
//     }

//     private extractTokenFromHeader(request: Request): string | undefined {
//         const [type, token] = request.headers.authorization?.split(' ') ?? [];
//         return type === 'Bearer' ? token : undefined;
//     }
// }


import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGaurd } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGaurd('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
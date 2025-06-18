import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET_KEY'),
      algorithms: ['RS256'],
      issuer: configService.getOrThrow('JWT_ISSUER'),
    });
  }

  async validate(payload: any): Promise<any> {
    return Promise.resolve({
      userId: payload.sub,
      username: payload.preferred_username,
      roles: payload.realm_access?.roles,
    });
  }
}

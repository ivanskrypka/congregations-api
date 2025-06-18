import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        publicKey: configService.getOrThrow<string>('JWT_SECRET_KEY'),
        signOptions: { algorithm: 'RS256' },
      }),
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';
import { ConfigAppProviderType } from './@types/config-app.type';
import { ConfigEnvType } from './@types/config-env.type';

@Injectable()
export class ConfigService {
  get(): ConfigAppProviderType {
    const {
      DATABASE_CONNECTION,
      DATABASE_USERNAME,
      DATABASE_PASSWORD,
      DATABASE_AUTH_SOURCE,
      JWT_SECRET_KEY,
      JWT_EXPIRES,
      ORIGIN,
      PORT,
      RABBITMQ_ENDPOINT,
      RABBITMQ_USERNAME,
      RABBITMQ_PASSWORD,
    } = process.env as ConfigEnvType;
    return {
      database: {
        connection: DATABASE_CONNECTION,
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        authSource: DATABASE_AUTH_SOURCE,
      },
      jwt: {
        secretKey: JWT_SECRET_KEY || 'jwt1secret',
        expires: Number(JWT_EXPIRES || 300000), // 5 minutes
      },
      node_env:
        (process.env.NODE_ENV as ConfigAppProviderType['node_env']) ||
        'development',
      origin: new RegExp(ORIGIN),
      port: Number(PORT || 5000),
      rabbitmq: {
        endpoint: RABBITMQ_ENDPOINT,
        username: RABBITMQ_USERNAME,
        password: RABBITMQ_PASSWORD,
      },
    };
  }
}

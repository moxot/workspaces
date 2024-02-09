import { Injectable } from '@nestjs/common';
import * as redis from 'redis';

@Injectable()
export class RedisService {
  redisClient: redis.RedisClientType;
  constructor() {
    this.redisClient = redis.createClient({
      url: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    this.redisClient.connect();
  }

  async set(key: string, value: string, ttl: number) {
    return this.redisClient.set(key, value, {
      EX: ttl,
    });
  }
  async get(key: string) {
    return this.redisClient.get(key);
  }

  async del(key: string) {
    return this.redisClient.del(key);
  }
}

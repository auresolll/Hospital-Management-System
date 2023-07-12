import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

interface ICache {
    key: string;
    minuteMillisecond: number;
    callback: any | any[];
}
@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async cache(options: ICache) {
        const { key, minuteMillisecond, callback } = options;
        const value: string = await this.cacheManager.get(key);
        if (!value) {
            const response = callback;
            await this.cacheManager.set(
                'getOverviews',
                JSON.stringify(response),
                minuteMillisecond,
            );
            return response;
        }
        return JSON.parse(value);
    }
}

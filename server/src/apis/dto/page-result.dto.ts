import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import mongoose, { SortOrder } from 'mongoose';

export class PagingDto {
    @IsOptional()
    @Transform(({ value }) => Number.parseInt(value, 10))
    page: number;

    @IsOptional()
    @Transform(({ value }) => Number.parseInt(value, 10))
    size: number;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    getAll?: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    mix?: boolean;

    @IsOptional()
    @IsString()
    search?: string;

    @Expose()
    skip() {
        if (!this.page || this.page < 1) {
            this.page = 1;
        }

        if (!this.size || this.size < 1) {
            this.size = 10;
        }

        return (this.page - 1) * this.size;
    }
}

export class PagingSortDto<T> extends PagingDto {
    sort?: SortOrder; // example: 'asc' | 'desc'
    [key: string]:
        | string
        | boolean
        | number
        | Function
        | mongoose.Types.ObjectId
        | Object;
    sortBy?: T;
}

export class PageResult<T> {
    items: T[];
    page?: number;
    pageSize?: number;
    size?: number;
    total?: number;
    search?: string;
}

export class KeyValuePair {
    [key: string]:
        | string
        | boolean
        | number
        | Function
        | mongoose.Types.ObjectId
        | Object;
}

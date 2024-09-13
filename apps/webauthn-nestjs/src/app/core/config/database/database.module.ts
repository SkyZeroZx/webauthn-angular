import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncOptions } from './database.config';

@Module({
	imports: [TypeOrmModule.forRootAsync(typeOrmAsyncOptions())]
})
export class DatabaseConfigModule {}

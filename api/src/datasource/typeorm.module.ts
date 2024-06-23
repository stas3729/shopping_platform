import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import {Category} from "../categories/entities/category.entity";
import {Review} from "../reviews/entities/review.entity";

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: true,
            entities: [User, Product, Category, Review],
            logging: true,
          });
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}

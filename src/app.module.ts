import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rawindra:4ktUwMm8Ruyr555X@ecom-cluster.vsz1yah.mongodb.net?retryWrites=true&w=majority',
    ),
    // MulterModule.register({
    //   dest: './uploads',
    // }),
    UserModule,
    CategoryModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

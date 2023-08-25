import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AttributeModule } from './attribute/attribute.module';
import { AttributeValueModule } from './attribute-value/attribute-value.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rawindra:4ktUwMm8Ruyr555X@ecom-cluster.vsz1yah.mongodb.net?retryWrites=true&w=majority',
    ),
    UserModule,
    CategoryModule,
    ProductModule,
    AuthModule,
    AttributeModule,
    AttributeValueModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

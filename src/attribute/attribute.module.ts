import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AttributeSchema } from './entities/attribute.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Attribute', schema: AttributeSchema }]),
  ],
  controllers: [AttributeController],
  providers: [AttributeService],
})
export class AttributeModule {}

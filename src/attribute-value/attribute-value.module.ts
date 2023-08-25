import { Module } from '@nestjs/common';
import { AttributeValueService } from './attribute-value.service';
import { AttributeValueController } from './attribute-value.controller';
import { AttributeValueSchema } from './entities/attribute-value.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AttributeValue', schema: AttributeValueSchema },
    ]),
  ],
  controllers: [AttributeValueController],
  providers: [AttributeValueService],
})
export class AttributeValueModule {}

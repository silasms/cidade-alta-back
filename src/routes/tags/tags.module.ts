import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [PrismaModule],
})
export class TagsModule {}

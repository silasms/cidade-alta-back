import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { TokenModule } from 'src/services/token/token.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [PrismaModule, TokenModule],
  exports: [TagsService],
})
export class TagsModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TokenModule } from 'src/services/token/token.module';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TokenModule, PrismaModule, TagsModule],
})
export class UsersModule {}

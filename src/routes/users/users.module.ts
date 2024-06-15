import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TokenModule } from 'src/services/token/token.module';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TokenModule, PrismaModule],
})
export class UsersModule {}

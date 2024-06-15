import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './routes/users/users.module';
import { TokenModule } from './services/token/token.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { TagsModule } from './routes/tags/tags.module';

@Module({
  imports: [UsersModule, TokenModule, PrismaModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

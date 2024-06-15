import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './routes/users/users.module';
import { TokenModule } from './services/token/token.module';
import { PrismaModule } from './services/prisma/prisma.module';

@Module({
  imports: [UsersModule, TokenModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

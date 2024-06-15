import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [TokenService],
  imports: [ConfigModule.forRoot()],
})
export class TokenModule {}

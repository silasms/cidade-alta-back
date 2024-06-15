import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTag(filter: any) {
    return await this.prismaService.tag.findMany({ where: filter });
  }
}

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllTags(@Query('filter') filter: any) {
    return await this.tagService.getTag(filter || {});
  }
}

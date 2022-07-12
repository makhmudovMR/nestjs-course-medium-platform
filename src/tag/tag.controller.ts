import { Controller, Get } from '@nestjs/common';
import { TagService } from '@app/tag/tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  findAll() {
    return this.tagService.findAll();
  }
}

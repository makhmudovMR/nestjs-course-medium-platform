import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity) private tagRepository: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<{ tags: string[] }> {
    const allTags: TagEntity[] = await this.tagRepository.find();
    return {
      tags: allTags.map((tag: TagEntity) => tag.name),
    };
  }
}

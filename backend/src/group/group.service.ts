import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { GroupDTO } from './group.dto';
import { getRandomString } from 'src/util/util';
import { User } from 'src/user/user.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(groupDto: GroupDTO, userId?: number): Promise<Group> {
    if (userId) {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      const group = this.groupRepository.create({
        name: groupDto.name,
        code: getRandomString(15),
        users: [user],
      });
      return this.groupRepository.save(group);
    }
    const group = new Group();
    group.name = groupDto.name;
    group.code = getRandomString(15);
    return this.groupRepository.save(group);
  }

  async getAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async getById(id: number): Promise<Group> {
    return this.groupRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.groupRepository.delete(id);
  }
}

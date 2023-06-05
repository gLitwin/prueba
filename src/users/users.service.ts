import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { skip } from 'rxjs';
import { promises } from 'dns';


@Injectable()
export class UsersService {

  constructor(private dataSource: DataSource) {}

  async createOne(user: User) {
    await this.dataSource.transaction(async manager => {
      await manager.save(user);
    });
  };

  async softRemoveUser(user: User) {
    await this.dataSource.transaction(async manager => {
      await manager.softRemove(user);
    });
  };

  async updateUser(id: number, conditions: object): Promise<UpdateResult> {

    const updateResult = await this.dataSource.transaction(async manager => {

      const updateResult = await manager.update(User, {id: id},{...conditions});
      return updateResult;
    });
    return updateResult;
  };


  async findAll(): Promise<User[]> {
    const user = await this.dataSource.transaction(async manager => {
      const user = await manager.find(User);
      return user;
    });
    return user
  };

  async findOneById(id): Promise<User> {
    const user = await this.dataSource.transaction(async manager => {
      const user = await manager.findOneById(User,id);
      return user;
    });
    return user
  }

  async findPag(conditions: object, pageSize: number, page: number): Promise<User[]> {
      const user1 = this.dataSource.transaction(async manager => {
        const user2 = manager
          .find(User, {...conditions, skip: page*pageSize, take: pageSize })  
        return user2
      });
      return user1
    };

  async count(conditions: object): Promise<number> {
    const count1 = this.dataSource.transaction(async manager => {
      const count2 = manager
        .count(User, conditions)
      return count2
    });
    return count1
  };








   /* async findPag(conditions, pageSize: number, page: number){
    await this.dataSource
    .getRepository(User)
    .createQueryBuilder()
    .select('user')
    .where("a")
    .andWhere("a")
    .skip(page * pageSize)
    .take(pageSize)
  } //FUNCIONA PERO ES POCO DINÁMICO  */












  /* constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {} */

/*   findAll(): Promise<User[]> {
    return this.usersRepository.find();
  } */

 /*  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  } */

 /*  findUsers(params: any): Promise<User[]>{
    return this.usersRepository.find({
      where:{
        firstName: params.firstName,
        lastName: params.lastName,
      }
    })
  } */


  /* async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: any): Promise<void> {
    await this.usersRepository.create(user)
  } */
}
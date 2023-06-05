import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { skip } from 'rxjs';
import { promises } from 'dns';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

  async create(user: any) {
    const userEntity = this.userRepository.create({...user})
    return await this.userRepository.save(userEntity)
  }

  async update(id: number, user: any) {
    const userEntity = await this.userRepository.preload({...user, id})
    return await this.userRepository.save(userEntity)
  }

  async delete(id: number) {
    const userEntity = await this.userRepository.preload({id})
    return await this.userRepository.softRemove(userEntity)
  }
  
  async findAll(page: number, pageSize: number) {
    const skip = page*pageSize;
    const users = await this.userRepository.find({skip: skip, take: pageSize})

    return { 
      users: users,
      page: page,
      totalresults: await this.userRepository.count()}
  }




  async search(user: any) {
  
    return await this.userRepository.findBy({...user})
  }
  
  async getById(id: number) {
  
    return await this.userRepository.findOneBy({id: id})
  }

  async getByPag(user: any, pageSize:number, page:number) {

    return await this.userRepository.find({where:{...user}, skip: page*pageSize, take: pageSize})
  }






/*   async countBy(user: any){
    return await this.userRepository.countBy({...user})
  } */



/* 
  async softRemoveUser(user: User) {
    await this.dataSource.transaction(async (manager) => {
      await manager.softRemove(user);
    });
  }

  async updateUser(id: number, conditions: object): Promise<UpdateResult> {
    const updateResult = await this.dataSource.transaction(async (manager) => {
      const updateResult = await manager.update(
        User,
        { id: id },
        { ...conditions },
      );
      return updateResult;
    });
    return updateResult;
  }

  async findAll(): Promise<User[]> {
    const user = await this.dataSource.transaction(async (manager) => {
      const user = await manager.find(User);
      return user;
    });
    return user;
  }

  async findOneById(id): Promise<User> {
    const user = await this.dataSource.transaction(async (manager) => {
      const user = await manager.findOneById(User, id);
      return user;
    });
    return user;
  }

  async findPag(
    conditions: object,
    pageSize: number,
    page: number,
  ): Promise<User[]> {
    const user1 = this.dataSource.transaction(async (manager) => {
      const user2 = manager.find(User, {
        ...conditions,
        skip: page * pageSize,
        take: pageSize,
      });
      return user2;
    });
    return user1;
  }

  async count(conditions: object): Promise<number> {
    const count1 = this.dataSource.transaction(async (manager) => {
      const count2 = manager.count(User, conditions);
      return count2;
    });
    return count1;
  }
 */
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

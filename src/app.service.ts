import { Injectable } from '@nestjs/common';
//import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}


  getHello(): string {
    return 'Hello World!';
  };

  createOne(queryParams: any): any {
    const {firstName, lastName} = queryParams;
    let user = new User;
    user.firstName = firstName;
    user.lastName = lastName;
    return this.usersService.createOne(user);
  };

  async findAndCount(queryParams:any): Promise<object> {
    const {pageSize, page, ...conditions} = queryParams;
    console.log({...conditions})
    const arrayusers = await this.usersService.findPag({where: conditions},pageSize,page);
    const count = await this.usersService.count({where: conditions});

    return {arrayusers, count, page}
  };

  async findAll(): Promise<object> {
   
    const arrayusers = await this.usersService.findAll();

    return {arrayusers}
  };

  async softRemoveUserById(queryParams:any): Promise<void> {
    const {id} = queryParams;
    console.log(id)
    const user = await this.usersService.findOneById(id);
    await this.usersService.softRemoveUser(user);

  };

  async updateUser(queryParams:any): Promise<UpdateResult> {
    const {id, ...conditions} = queryParams;
    console.log({...conditions})
    //const user = await this.usersService.findOneById(id);
    const result = await this.usersService.updateUser(id, {...conditions});

    return result;
  }




}

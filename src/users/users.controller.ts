import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
    
  createOne(user: User): Promise<void> {
   
    return this.usersService.createOne(user);
  }
}

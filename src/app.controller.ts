import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersController } from './users/users.controller';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hola")
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('users')
  createOne(@Query() queryParams:any): any {
    //return params
    return this.appService.createOne(queryParams);
  }

  @Get('findusers')
  findAndCount(@Query() queryParams:any):object {
    //console.log(queryParams)
    return this.appService.findAndCount(queryParams);
  } //FUNCIONA?

  @Get('findAll')
  findAll():object {
    //console.log(queryParams)
    return this.appService.findAll();
  }

  @Get('softRemoveUser')
  softRemoveUser(@Query() queryParams:any):object {
    //console.log(queryParams)
    return this.appService.softRemoveUserById(queryParams);
  }

  @Get('updateUser')
  updateUser(@Query() queryParams:any):object {
    //console.log(queryParams)
    return this.appService.updateUser(queryParams);
  }

  @Get('createUser')
  createUser(@Query() queryParams:any):object {
    //console.log(queryParams)
    return this.appService.createOne(queryParams);
  }

}

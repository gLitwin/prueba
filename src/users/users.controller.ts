import { Body, Param, Controller, Get, Patch, Post, Query, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: any) {
    return this.usersService.create(user);
  }

  @Patch(':id')
  update(@Body() user: any, @Param('id') id: string) {
    return this.usersService.update(+id, user);
  }

  @Delete(':id') delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }

  @Get() findAll(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.usersService.findAll(+page, +pageSize);
  }

  @Get('search') search(@Body() user: any) {
    return this.usersService.search(user);
  }

  @Get(':id') getById(@Param('id') id: string) {
    return this.usersService.getById(+id);
  }
}

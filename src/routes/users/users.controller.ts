import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticationBodyDTO } from './dto/authentication-body.dto';
import { CreateUserBodyDTO } from './dto/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateUserBodyDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly user: UsersService) {}

  @ApiOperation({
    summary: 'Authenticate user in this application.',
  })
  @ApiResponse({
    status: 201,
    description: 'Return an authentication token generated with JWT.',
  })
  @Post('login')
  autenticateUser(@Body() body: AuthenticationBodyDTO) {
    return this.user.logIn(body);
  }

  @ApiOperation({
    summary: "Create a new user's user.",
  })
  @ApiResponse({
    status: 201,
    description: 'Return an authentication token generated with JWT.',
  })
  @Post()
  createUser(@Body() body: CreateUserBodyDTO) {
    return this.user.createUser(body);
  }

  @ApiOperation({
    summary: 'Find a user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Return an authentication token generated with JWT.',
  })
  @UseGuards(AuthGuard)
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.user.getUser(id);
  }

  @ApiOperation({
    summary: 'Update a user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Return an authentication token generated with JWT.',
  })
  @UseGuards(AuthGuard)
  @Patch('/')
  updateUser(@Body() body: UpdateUserBodyDTO) {
    return this.user.updateUser(body);
  }

  @ApiOperation({
    summary: 'Reward a tag for user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Return an authentication token generated with JWT.',
  })
  @UseGuards(AuthGuard)
  @Get('/reward/:id')
  rewardTag(@Param('id') id: string) {
    return this.user.rewardTag(id);
  }
}

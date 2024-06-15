import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticationBodyDTO } from './dto/authentication-body.dto';
import { CreateUserBodyDTO } from './dto/create-user.dto';

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
}

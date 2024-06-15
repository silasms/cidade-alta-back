import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * Describe the expected variables of the user creation body.
 */
export class CreateUserBodyDTO {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8)
  @Type(() => String)
  password: string;
}

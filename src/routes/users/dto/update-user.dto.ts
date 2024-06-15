import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

/**
 * Describe the expected variables of the user creation body.
 */
export class UpdateUserBodyDTO {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsEmail()
  @Type(() => String)
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @Length(8)
  @Type(() => String)
  password: string;
}

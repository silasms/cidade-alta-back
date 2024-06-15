import {
  Injectable,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/services/token/token.service';
import { AuthenticationBodyDTO } from './dto/authentication-body.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateUserBodyDTO } from './dto/create-user.dto';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class UsersService {
  constructor(
    private tokenService: TokenService,
    private prismaService: PrismaService,
  ) {}

  private encryptPassword(password: string) {
    return new Promise<string>(async (resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  }

  /**
   * Compare the given hash and the given password using bcrypt.
   *
   * @param hash Hash to be compared.
   * @param password Password to be compared.
   *
   * @returns If encrypted password in the hash are the same to the given
   * password the return is true, if not returns false.
   */
  private correctPassword(hash: string, password: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      bcrypt.compare(password, hash, function (err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  async logIn({ email, password }: AuthenticationBodyDTO) {
    const user = await this.prismaService.user.findFirst({
      select: { id: true, password: true },
      where: { email },
    });
    if (!user) throw new UnauthorizedException('Invalid email or password.');

    const { password: hash, ...userData } = user;

    if (!(await this.correctPassword(hash, password)))
      throw new UnauthorizedException('Invalid email or password.');

    return {
      token: await this.tokenService.createToken({ ...userData }),
    };
  }

  async createUser({ email, password, name }: CreateUserBodyDTO) {
    const user = await this.prismaService.user.findFirst({
      select: { id: true },
      where: { email },
    });
    if (user) throw new PreconditionFailedException('Email already exists.');

    const userData = await this.prismaService.user.create({
      select: { id: true },
      data: {
        id: uuidv7(),
        email,
        password: await this.encryptPassword(password),
        name,
      },
    });

    return {
      token: await this.tokenService.createToken({ ...userData }),
    };
  }
}

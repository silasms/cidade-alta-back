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
import { UpdateUserBodyDTO } from './dto/update-user.dto';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class UsersService {
  constructor(
    private tokenService: TokenService,
    private prismaService: PrismaService,
    private tagService: TagsService,
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

  async getUser(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id },
      include: { tags: { include: { tag: true } } },
    });
    if (!user) throw new PreconditionFailedException('Id not exists.');

    return user;
  }

  async updateUser({ name, email, password }: UpdateUserBodyDTO) {
    const updateUser = await this.prismaService.user.update({
      include: {
        tags: true,
      },
      where: {
        email,
      },
      data: {
        name,
        password,
        email,
      },
    });
    return updateUser;
  }

  async rewardTag(id: string) {
    const user = await this.getUser(id);

    const userTag = user.tags.map(({ tag }) => {
      return tag.id;
    });

    const tags = await this.tagService.getTag({});
    const filteredTags = tags.filter(({ id }) => !userTag.includes(id));
    const randomTag =
      filteredTags[Math.floor(Math.random() * filteredTags.length)];
    const userWithTag = await this.prismaService.usersTags.create({
      data: {
        id: uuidv7(),
        userId: id,
        tagId: randomTag.id,
      },
    });
    return userWithTag;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { jwt_config } from 'src/config/config_jwt';
import { unlink } from 'fs/promises';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private jwtService: JwtService,
  ) {}

  async getUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  /**
   * Register
   * @param data
   * @returns
   */
  async register(data: RegisterDto) {
    const checkUser = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (checkUser) {
      throw new HttpException('User already exists', HttpStatus.FOUND);
    }

    data.password = await hash(data.password, 12);
    const createUser = await this.userRepository.save({
      ...data,
    });

    if (createUser) {
      return {
        statusCode: HttpStatus.OK,
        message: 'User has been created',
        data: createUser,
      };
    }
  }

  async login(data: LoginDto) {
    const checkUser = await this.userRepository.findOne({
      where: {
        username: data.username,
      },
    });

    if (!checkUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(data.password, checkUser.password);

    if (checkPassword) {
      const accessToken = this.generateJWT({
        sub: checkUser.id,
        email: checkUser.email,
        username: checkUser.username,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Login success',
        data: checkUser,
        accessToken: accessToken,
      };
    } else {
      throw new HttpException('Password not match', HttpStatus.UNAUTHORIZED);
    }
  }

  async profile(user_id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async uploadAvatar(user_id: string, avatar) {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (user) {
      if (user.avatar) {
        try {
          await unlink(user.avatar);
        } catch (err) {
          console.error(`Failed to delete old avatar: ${err}`);
        }
      }

      const updateAvatar = await this.userRepository.update(
        {
          id: user_id,
        },
        {
          avatar: avatar,
        },
      );

      if (!updateAvatar.affected) {
        throw new HttpException(
          'Failed to update avatar',
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        avatar: avatar,
      };
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  generateJWT(payload: any) {
    return this.jwtService.sign(payload, {
      secret: jwt_config.secret,
      expiresIn: jwt_config.expired,
    });
  }
}

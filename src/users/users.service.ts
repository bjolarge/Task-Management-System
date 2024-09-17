// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, In } from 'typeorm';
// import * as bcrypt from 'bcryptjs';
// import  User  from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   async getByEmail(email: string) {
//     const user = await this.usersRepository.findOneBy({ email });
//     if (user) {
//       return user;
//     }
//     throw new HttpException(
//       'User with this email does not exist',
//       HttpStatus.NOT_FOUND,
//     );
//   }

//   async getByIds(ids: number[]) {
//     return this.usersRepository.find({
//       where: { id: In(ids) },
//     });
//   }

//   async getById(id: number) {
//     const user = await this.usersRepository.findOneBy({ id });
//     if (user) {
//       return user;
//     }
//     throw new HttpException(
//       'User with this id does not exist',
//       HttpStatus.NOT_FOUND,
//     );
//   }

//   async create(userData: CreateUserDto) {
//     const newUser = await this.usersRepository.create(userData);
//     await this.usersRepository.save(newUser);
//     return newUser;
//   }

//   async setCurrentRefreshToken(refreshToken: string, userId: number) {
//     const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
//     await this.usersRepository.update(userId, {
//       currentHashedRefreshToken,
//     });
//   }

//   async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
//     const user = await this.getById(userId);

//     const isRefreshTokenMatching = await bcrypt.compare(
//       refreshToken,
//       user.currentHashedRefreshToken,
//     );

//     if (isRefreshTokenMatching) {
//       return user;
//     }
//   }

//   async markEmailAsConfirmed(email: string) {
//     return this.usersRepository.update(
//       { email },
//       {
//         isEmailConfirmed: true,
//       },
//     );
//   }

//   async removeRefreshToken(userId: number) {
//     return this.usersRepository.update(userId, {
//       currentHashedRefreshToken: null,
//     });
//   }
// }


import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { hashPassword } from 'src/common/utils.';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserSensitive } from './dto/update-user-sensitive.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
//import { AuditService } from 'src/audit/audit.service';


@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager:EntityManager,
    //private readonly auditService: AuditService,

  ) {}

  // update users to use audit try
  // async updateUser(id: number, updateData: Partial<User>, userId: number): Promise<User> {
  //   const user = await this.usersRepository.findOne({where:{id:id}});
  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   const oldValue = { ...user };
  //   Object.assign(user, updateData);
  //   const updatedUser = await this.usersRepository.save(user);

  //   await this.auditService.createAudit(
  //     'User',
  //     id,
  //     'UPDATE',
  //     oldValue,
  //     updatedUser,
  //     userId,
  //   );

  //   return updatedUser;
  // }

  // this handles the refresh feature
  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken
    });
  }
  // this handles the refreshtoken
  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
      
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
  //this allows us to sum up the total number of app user 
  async findusercount(){
    const usercount = await this.usersRepository.count();
    return usercount;
  }

  // this returns the list of all the total users in the app
  findAll( paginationQuery:PaginationQueryDto) {
    const {limit,offset} = paginationQuery;
    return this.usersRepository.find(
    {
      skip:offset,
      take:limit,
    }
    );
  }

  //remove refreshtoken
  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null
    });
  }

  //create user with Google Oauth
  async createWithGoogle(email: string, name: string) {
    const newUser = await this.usersRepository.create({
      email,
      name,
      isRegisteredWithGoogle: true,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  //email confirmation
  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.update({ email }, {
      isEmailConfirmed: true
    });
  }

  //get userById
  async getById(id) {
    const user = await this.usersRepository.findOneBy(id );
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  //get by email otp
  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({
      email,
    });
  }

  async getUserById(id:number){
    const user = await this.usersRepository.count();
    // I had to return the user
    return user;
  }


  //get user if refreshToken
  
//close refreshToken
  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({email});
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
 
  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
   
  }

  //update user
  // async update(
  //   id: string,
  //   updateUserDto: UpdateUserDto,
  // ): Promise<UpdateUserDto> {
  //   const user = await this.findById(id);
  //   if (!user || user === null) {
  //     throw new NotFoundException();
  //   }
  //   const hashedPassword = await hashPassword(userToUpdate);
  //   const userToUpdate = {
  //     ...user,
  //     ...updateUserDto,
  //     password: hashedPassword,
  //   };

  //   const updatedUser = await this.usersRepository.save(userToUpdate);
  //   delete updatedUser.password;
  //   return updatedUser;
  // }

  //findbyId
  async findById(id): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id});
  }

  // async updateUserSensitive(
  //   userId: string,
  //   updateUserSensitive: UpdateUserSensitive,
  // ): Promise<UpdateUserSensitive> {
  //   const user = await this.findById(userId);
  //   if (!user || user === null) {
  //     throw new NotFoundException();
  //   }

  //   if (user) {
  //     if (updateUserSensitive.active) {
  //       user.active = updateUserSensitive.active;
  //     }
  //     if (updateUserSensitive.authToken) {
  //       user.authToken = updateUserSensitive.authToken;
  //     }
  //   }

  //   const updatedUser = await this.usersRepository.save({
  //     ...user,
  //     ...updateUserSensitive,
  //   });
  //   return updatedUser;
  // }
}
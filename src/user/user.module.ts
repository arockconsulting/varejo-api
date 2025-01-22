import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../infra/entities/user,schema';
import { UserService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Integração com MongoDB
  ],
  providers: [UserService],
  exports: [UserService], // Permite que outros módulos (como AuthModule) usem este serviço
})
export class UserModule {}

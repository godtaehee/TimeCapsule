import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { typeORMConfig } from './config/typeorm.config';
import { CapsulesModule } from './capsules/capsules.module';
import { ControllerService } from './repository/controller/controller.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UsersModule, CapsulesModule],
  controllers: [AppController],
  providers: [AppService, ControllerService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { ManagerEntity } from "../manager/manager.entity";
import { AdminProfile } from "src/AdminProfile/AdminProfile.entity";
import { MailerModule } from "@nestjs-modules/mailer/dist";


@Module({

    imports: [

     

     

      MailerModule.forRoot({

        transport: {

          host: 'your-smtp-host',

          port: 465,

          secure: false,

          auth: {

            user: 'daspranta7@gmail.com',

            pass: 'msznnjgfcvzqzmhp',

          },

        },

        defaults: {

          from: 'pranta',

        },

       

      }),


      TypeOrmModule.forFeature([AdminEntity,ManagerEntity,AdminProfile]),],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule{}
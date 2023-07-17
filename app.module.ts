import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer/dist';
@Module({

  imports: [

    MailerModule.forRoot({

      transport: {

        service: 'Gmail',

        auth: {

          user: 'daspranta7@gmail.com',

          pass: 'msznnjgfcvzqzmhp',

        },

      },

      defaults: {

        from: '"pranta" <  >',

      },

      

    }),





 AdminModule, TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12344321',
    database: '3np_backend',//Change to your database name
    autoLoadEntities: true,
    synchronize: true,
    } ),
  ] ,
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { LoggerModule as PinoLogger} from 'nestjs-pino';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { WebsocketGateway } from './websocket.gateway';
import { ProductsModule } from './products/products.module';
import { ManageModule } from './manage/manage.module';
import { ScalesModule } from './scales/scales.module';
import { PanelsModule } from './panels/panels.module';
import { FrozenModule } from './frozen/frozen.module';
import { DeskModule } from './desk/desk.module';
import { LearnerModule } from './learner/learner.module';
import { CleanModule } from './clean/clean.module';
import { DenModule } from './den/den.module';
import { ItemsModule } from './items/items.module';
import { LockModule } from './lock/lock.module';
import { SlipsModule } from './slips/slips.module';
//import { CloudinaryImagesModule } from './cloudinary-images/cloudinary-images.module';
import { PlentsModule } from './plents/plents.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MongooseModule } from '@nestjs/mongoose'
import { LaymentModule } from './layment/layment.module';
import { NsPaystackModule } from '@devtools-bp/nestjs-paystack';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PostsModule } from './posts/posts.module';
import { AuditModule, TransportMethods } from '@appstellar/nestjs-audit';
//import { AuditModule } from './audit/audit.module';
import { PaystackModule } from './paystack/paystack.module';
import { CartModule } from './cart/cart.module';
import {ScheduleModule} from '@nestjs/schedule'
//import { DeliveryService } from './delivery/delivery.service';
//import { DeliveryController } from './delivery/delivery.controller';
//import { SmsModule } from './sms/sms.module';
//import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    AuditModule.forRoot({
      transports: [
        // only one of three supported transport methods is required, but multiple transports can be used as well
        { name: TransportMethods.CONSOLE },
        {
          name: TransportMethods.MONGOOSE,
          options: { connectionString: 'mongodb://127.0.0.1:27017/xactwear' },
        }
      ],
      // optional (defaults to false)
      logErrors: true,
      // optional
      getUserId: (req) => req.id,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
       //PORT
       PORT: Joi.number().required(),
       //...SECRETS
       JWT_SECRET: Joi.string().required(),
       JWT_EXPIRATION_TIME: Joi.string().required(),
       // Refresh token part
       JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
       JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
       JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
       JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
       //google Oauth
       GOOGLE_ID: Joi.string().required(),
       GOOGLE_SECRET: Joi.string().required(),
       //Email Service
       EMAIL_SERVICE: Joi.string().required(),
       EMAIL_USER: Joi.string().required(),
       EMAIL_PASSWORD: Joi.string().required(),
       EMAIL_CONFIRMATION_URL: Joi.string().required(),
       JWT_VERIFICATION_TOKEN_SECRET:Joi.string().required(),
       JWT_VERIFICATION_TOKEN_EXPIRATION_TIME:Joi.string().required(),
     })
     }),

  //  MongooseModule.forRootAsync({
  //   imports: [ConfigModule],
  //   inject: [ConfigService],
  //   useFactory:(configService: ConfigService) => ({
  //     uri: configService.get('uri'),
  //   }),
  // }),
  //paystack integration
  NsPaystackModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secretKey: configService.get('PAYSTACK_SECRET_KEY')
    }),
    inject: [ConfigService]
  }),
  MongooseModule.forRoot('mongodb://127.0.0.1:27017/xactwear'),
//   MongooseModule.forRoot( 
//     mongodb+srv://furnitures:furnitures@furnitures.bwwgxqz.mongodb.net/?retryWrites=true&w=majority&appName=furnitures
// ),

     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
     useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'), 
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      autoLoadEntities: true,
     //change this whilst going live in Niyo TMS production server to synchronise false
        synchronize:true,
      }),
      inject: [ConfigService],
    }),
   TasksModule,
    PinoLogger.forRoot({
      pinoHttp:{
        transport:{
          targets:[
        {
              target: 'pino/file',
              options: { destination:`C:/Logging/apps.log`},
        },
        ]
        }
      }
    }),
    AuthenticationModule,
    UsersModule,
    EmailModule,
    EmailConfirmationModule,
    ItemsModule,
    ProductsModule,
    ManageModule,
    ScalesModule,
    PanelsModule,
    FrozenModule,
    DeskModule,
    LearnerModule,
    CleanModule,
    DenModule,
    LockModule,
    SlipsModule,
    //CloudinaryImagesModule,
    PlentsModule,
    DropdownModule,
    TransactionsModule,
    LaymentModule,
    CloudinaryModule,
    PostsModule,
    PaystackModule,
    CartModule,
    ScheduleModule.forRoot(),
   // SmsModule,
   // DeliveryModule
   // AuditModule
  ],
  controllers: [AppController, 
   // DeliveryController
  ],
  providers: [AppService,WebsocketGateway],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SmsModule } from 'src/sms/sms.module';
import { UsersModule } from 'src/users/users.module';
import { DeliveryService } from './delivery.service';
import { SmsService } from 'src/sms/sms.service';

@Module({
    imports:[UsersModule, SmsModule],
    providers:[DeliveryService, SmsService],
    exports:[DeliveryService]
})
export class DeliveryModule {}

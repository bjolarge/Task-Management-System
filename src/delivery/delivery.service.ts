// delivery.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsService } from 'src/sms/sms.service';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private smsService: SmsService
  ) {}

  async notifyUserOfDelivery(id: number, deliveryNoteDetails: string): Promise<void> {
    const user = await this.userRepository.findOneBy({id:id});
    if (!user) {
      throw new Error('User not found');
    }
    
    const message = `Your delivery note has arrived: ${deliveryNoteDetails}`;
    await this.smsService.sendSms(user.phoneNumber, message);
  }
}

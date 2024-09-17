import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from './entities/audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Audit)
    private readonly auditRepository: Repository<Audit>,
  ) {}

  async createAudit(
    entityName: string,
    entityId: number,
    action: string,
    oldValue: any,
    newValue: any,
    userId: number,
  ): Promise<Audit> {
    const audit = new Audit();
    audit.entityName = entityName;
    audit.entityId = entityId;
    audit.action = action;
    audit.oldValue = oldValue;
    audit.newValue = newValue;
    audit.userId = userId;
    
    return this.auditRepository.save(audit);
  }
}

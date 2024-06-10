import { CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import * as moment from 'moment';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt: Date;

  @BeforeInsert()
  updateDates() {
    this.createdAt = this.updatedAt = moment().add(7, 'hours').toDate();
  }

  @BeforeInsert()
  updateUpdatedAt() {
    this.updatedAt = moment().add(7, 'hours').toDate();
  }
}

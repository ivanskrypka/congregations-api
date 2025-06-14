import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PublisherType, ServiceType, Sex } from './enums';
import { Congregation } from '../../congregation/entity/congregation.entity';

@Entity({ name: 'publishers' })
export class Publisher {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'farther_name' })
  fatherName: string;

  @Column({
    type: 'enum',
    enum: PublisherType,
    name: 'publisher_type',
  })
  publisherType: PublisherType;

  @Column({
    type: 'enum',
    enum: Sex,
  })
  sex: Sex;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'date', name: 'baptised_date' })
  baptisedDate: Date;

  @Column()
  address: string;

  @Column({
    name: 'service_types',
    type: 'enum',
    enum: ServiceType,
    array: true,
    nullable: true,
  })
  serviceTypes: ServiceType[];

  @ManyToOne(() => Congregation)
  @JoinColumn({ name: 'congregation_id' })
  congregationId: string;

  @VersionColumn()
  version: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}

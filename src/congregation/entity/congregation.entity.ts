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
import { Country } from './country.entity';

@Entity({ name: 'congregations' })
export class Congregation {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  timezone: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column()
  city: string;

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

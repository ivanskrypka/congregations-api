import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  timezone: string;

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

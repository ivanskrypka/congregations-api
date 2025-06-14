import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  timezone: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}

import { BeforeInsert, Column, Entity, PrimaryColumn, Table } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'congregations' })
export class Congregation {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}

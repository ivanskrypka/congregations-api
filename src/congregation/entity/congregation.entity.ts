import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Table } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Country } from '../../location/entity/country.entity';

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

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}

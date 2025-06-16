import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1749397330429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS congregations.countries (
        id varchar(255) NOT NULL PRIMARY KEY ,
        code varchar(10) NOT NULL UNIQUE ,
        timezone varchar(100) not NULL,
        version int not null default 0,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS congregations.congregations (
          id varchar(255) NOT NULL PRIMARY KEY,
          name varchar(255) NOT NULL,
          timezone varchar(100) NOT NULL,
          country_id varchar(255) NOT NULL,
          city varchar(50) NOT NULL,
          version int not null default 0,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          CONSTRAINT fk_country FOREIGN KEY (country_id) REFERENCES congregations.countries(id),
          CONSTRAINT unique_country_city_name UNIQUE (country_id, city, name)
      ); 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE congregations.congregations;`);
    await queryRunner.query(`DROP TABLE congregations.countries;`);
    await queryRunner.query(`DROP TABLE congregations.timezones;`);
  }
}
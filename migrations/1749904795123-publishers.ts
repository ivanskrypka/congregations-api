import { MigrationInterface, QueryRunner } from 'typeorm';

export class Publishers1749904795123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE congregations.publisher_type AS ENUM ('BAPTISED', 'UNBAPTISED_PUBLISHER', 'ELDER', 'ASSISTANT', 'FULL_TIME_PIONEER','INTERESTED');
        CREATE TYPE congregations.sex AS ENUM ('MALE', 'FEMALE');
        CREATE TYPE congregations.service_type AS ENUM ('GENERAL', 'USHER', 'MINISTRY_SCHOOL_STUDENT','AUDIO_VIDEO');
        create table if not exists congregations.publishers (
            id varchar(255) NOT NULL PRIMARY KEY,
            first_name     varchar(100)          not null,
            last_name      varchar(100)          not null,
            farther_name   varchar(100),
            publisher_type congregations.publisher_type not null,
            birthday date ,
            baptised_date date,
            sex congregations.sex not null,
            service_types congregations.service_type[] default '{}'::congregations.service_type[];
            address varchar(255),
            congregation_id varchar(255) NOT NULL,
            version        int                   not null default 0,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            CONSTRAINT fk_congregation FOREIGN KEY (congregation_id) REFERENCES congregations.congregations(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE congregations.publishers;`);
    await queryRunner.query(`DROP TYPE congregations.sex;`);
    await queryRunner.query(`DROP TYPE congregations.publisher_type;`);
    await queryRunner.query(`DROP TYPE congregations.service_type;`);
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class imageMigration1655908303412 implements MigrationInterface {
    name = 'imageMigration1655908303412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "title" character varying(120) NOT NULL, "description" character varying(320) NOT NULL, "comments" character varying array NOT NULL DEFAULT '{}', "image" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "image"`);
    }

}

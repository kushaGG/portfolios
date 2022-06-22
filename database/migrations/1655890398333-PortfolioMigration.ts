import { MigrationInterface, QueryRunner } from "typeorm";

export class PortfolioMigration1655890398333 implements MigrationInterface {
    name = 'PortfolioMigration1655890398333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "title" character varying(120) NOT NULL, "description" character varying(320) NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_9d041c43c782a9135df1388ae16" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_9d041c43c782a9135df1388ae16"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
    }

}

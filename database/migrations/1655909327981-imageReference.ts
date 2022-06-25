import { MigrationInterface, QueryRunner } from "typeorm";

export class imageReference1655909327981 implements MigrationInterface {
    name = 'imageReference1655909327981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" ADD "portfolioId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_fc51544dbbba949bc7c12e52834" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_fc51544dbbba949bc7c12e52834"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "portfolioId"`);
    }

}

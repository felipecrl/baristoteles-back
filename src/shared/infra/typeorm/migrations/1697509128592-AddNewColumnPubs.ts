import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddNewColumnPubs1697509128592 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pubs" ADD COLUMN "avatar" VARCHAR NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pubs" DROP COLUMN "avatar"`)
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePubs1696007651742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pubs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'address',
            type: 'varchar'
          },
          {
            name: 'number',
            type: 'varchar'
          },
          {
            name: 'neighborhood',
            type: 'varchar'
          },
          {
            name: 'instagram',
            type: 'varchar'
          },
          {
            name: 'recommendation',
            type: 'varchar'
          },
          {
            name: 'cover',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pubs')
  }
}

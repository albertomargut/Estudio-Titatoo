import { MigrationInterface, QueryRunner, Table } from "typeorm";

// -----------------------------------------------------------------------------

export class CreateAppointments1705350282513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    

        await queryRunner.createTable(
            new Table({
              name: "appointments",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "client_id",
                  type: "int",
                  isUnique: true,
                },
                {
                  name: "artist_id",
                  type: "int",
                  isUnique: true,
                  isNullable: true,
                },
                {
                  name: "appointment_date",
                  type: "varchar",
                  length: "50",
                },
          
              {
                name: "status",
                type: "enum",
                enum: ["scheduled", "canceled"],
             },
             {
              name: "tattoo_style",
              type: "enum",
              enum: ["Old school", "Japanese", "Traditional",  "Tribal", "Blackwork "],
              isNullable: true,
            },
              ],
              foreignKeys: [
                {
                  columnNames: ["client_id"],
                  referencedTableName: "clients",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE"
                },
                {
                  columnNames: ["artist_id"],
                  referencedTableName: "artists",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE"
                },
             ],
            }),
            true
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.dropTable("appointments");
    }

}

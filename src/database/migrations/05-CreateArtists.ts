import { MigrationInterface, QueryRunner, Table } from "typeorm";

// -----------------------------------------------------------------------------

export class CreateArtists1705350249551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.createTable(
            new Table({
              name: "artists",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "user_id",
                  type: "int",
                  isUnique: true,
                },
                {
                  name: "tattoo_style",
                  type: "enum",
                  enum: ["Old school", "Japanese", "Traditional",  "Tribal", "Blackwork "],
                  isNullable: true
                },
                {
                  name: "work_experience",
                  type: "int",
                  isNullable: true,
               },
              ],
              foreignKeys: [
                {
                  columnNames: ["user_id"],
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE"
                },
              ],
            }),
            true
          );
        }
      
        public async down(queryRunner: QueryRunner): Promise<void> {
      
          await queryRunner.dropTable("artists");
        }
      }
      
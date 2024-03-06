import { MigrationInterface, QueryRunner, Table } from "typeorm";

// -----------------------------------------------------------------------------

export class CreateClients1705350232840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    

        await queryRunner.createTable(
            new Table({
              name: "clients",
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
                  name: "nationality",
                  type: "varchar",
                  length: "255",
                  isNullable: true,
               },
               {
                name: "gender",
                type: "enum",
                enum: ["male", "female"],
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
      
          await queryRunner.dropTable("clients");
        }
      }
      

import { MigrationInterface, QueryRunner, Table } from "typeorm";

// -----------------------------------------------------------------------------

export class CreateUsersRoles1705350214568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
           new Table({
              name: "users_roles",
              columns: [
                 {
                    name: "user_id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                 },
                 {
                    name: "role_id",
                    type: "int",
                    isPrimary: true,
                    isNullable:false,
                    default: 1,
                    

                    
                 },
              ],
              foreignKeys: [
               {
                  columnNames: ["user_id"],
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  // onDelete: "CASCADE",
               },
                {
                  columnNames: ["role_id"],
                  referencedTableName: "roles",
                  referencedColumnNames: ["roleid"],
                  // onDelete: "CASCADE",
                },
               ],
           }),
           true
        );
     }
  
     public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_roles");
     }
  }
  
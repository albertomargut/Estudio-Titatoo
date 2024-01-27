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
                 },
                 {
                    name: "role_id",
                    type: "int",
                    isPrimary: true,
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
  
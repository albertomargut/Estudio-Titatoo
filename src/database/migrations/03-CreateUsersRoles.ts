import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Role } from "../../models/Role";
import { User } from "../../models/User";
import { UserRoles } from "../../constants/UserRoles";
import { randomInt } from "crypto";

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
            foreignKeys: [
               {
                  columnNames: ["user_id"],
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE",
               },
               {
                  columnNames: ["role_id"],
                  referencedTableName: "roles",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE",
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
  
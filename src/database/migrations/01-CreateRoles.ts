import { MigrationInterface, QueryRunner, Table } from "typeorm";

// -----------------------------------------------------------------------------

export class CreateRoles1705350197322 implements MigrationInterface {

 
    public async up(queryRunner: QueryRunner): Promise<void> {
    

    
        await queryRunner.createTable(
            new Table({
               name: "roles",
               columns: [
                  {
                     name: "roleid",
                     type: "int",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "increment",
                  },
                  {
                    name: "role_name",
                    type: "enum",
                    enum: ["client", "artist", "admin"],
                    default: '"client"'
                    //  name: "name",
                    //  type: "varchar",
                    //  length: "50",
                    //  isUnique: true,
                  },
               ],
            }),
            true
        );    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("roles");
    }

}

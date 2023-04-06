import pgp from "pg-promise";

const db = pgp()({
    user: 'postgres',
    host: 'localhost',
    database: 'db_test',
    password: 'ECO@2012',
    port: 5432
  });

module.export = db;
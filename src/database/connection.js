import pgp from "pg-promise";

export const db = pgp()({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432
});

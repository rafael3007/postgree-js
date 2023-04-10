import pgp from "pg-promise";

//home 123456
//to ECO@2012
export const db = pgp()({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'ECO@2012',
  port: 5432
});
// função para criar tabela users
async function createUsersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;
  await db.query(query);
}

// função para criar tabela profiles
async function createProfilesTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS profiles(
      id SERIAL PRIMARY KEY,
      nome TEXT DEFAULT '-',
      numero TEXT NOT NULL,
      lastMessage TIMESTAMP DEFAULT NOW()
    );
  `;
  await db.query(query);
}

// função para verificar conexão com o banco de dados e criar tabelas se necessário
export async function initialize() {
  try {
    // verifica conexão com o banco de dados
    await db.query('SELECT 1');
    console.log('Conectado ao banco de dados.');

    // verifica se tabela users existe, caso não exista, cria
    const usersTableExists = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'users'
      );
    `);
    if (!usersTableExists.exists) {
      //console.log('Tabela users não existe. Criando tabela...');
      await createUsersTable();
      //console.log('Tabela users criada com sucesso!');
    }

    // verifica se tabela profiles existe, caso não exista, cria
    const profilesTableExists = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'profiles'
      );
    `);
    if (!profilesTableExists.exists) {
      //console.log('Tabela profiles não existe. Criando tabela...');
      await createProfilesTable();
      //console.log('Tabela profiles criada com sucesso!');
    }
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
}

//initialize();
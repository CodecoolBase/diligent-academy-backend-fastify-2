import {Pool} from 'pg';

export type DbClient = {
  query: <RowType>(query: string, params?: any[]) => Promise<RowType[] | RowType>;
}

export function createPgClient(): DbClient {
  const pool = new Pool({
    connectionString: 'postgres://postgres:dbpassword@localhost:5400/pets'
  });
  return {
    async query(sql: string, params?: any[]) {
      const result = await pool.query(sql, params);
      return result.rows;
    }

  }
}
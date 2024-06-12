declare module 'mysql2' {
    import { Connection, ConnectionOptions } from 'mysql';
  
    export interface PoolConnection extends Connection {}
    export interface Pool {
      getConnection(callback: (err: Error, connection: PoolConnection) => void): void;
      query<T>(sql: string, values?: any): Promise<[T[], any[]]>;
    }

    export interface RowDataPacket {
      [columnName: string]: any;
    }
  
    export function createPool(options: ConnectionOptions): Pool;
}

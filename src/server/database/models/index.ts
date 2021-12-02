export interface AuthorsTable{
    
    //userid?: number;
    id?: number;
    name?: string; 
    email?: string;
    password?: string;
    created_at?: Date;
    userid?: number;  //Q: optimal fix for TS error on authorCheck mw?
}

export interface MysqlResponse{
    affectedRows: number;
    insertId: number;
}
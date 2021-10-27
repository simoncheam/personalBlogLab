import * as mysql from "mysql";
import {database_config} from "../config";
import {MySQL_Default_Response} from "../types";

const connection_to_db = mysql.createPool(database_config);

export const TalkToMySQL = <T = MySQL_Default_Response>(sql_string: string, values?: unknown[])=>{

    return new Promise<T>((resolve, reject)=>{

        const formatted_sql = mysql.format(sql_string, values);

        console.log({formatted_sql});

        connection_to_db.query(formatted_sql, (err,results)=>{
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        })
    })

}
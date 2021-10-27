import {TalkToMySQL} from "../index";
import {Authors} from "../../types";

const get_all = () => TalkToMySQL<Authors[]>("SELECT * FROM Users");

const get_one_by_id = (id:number) => TalkToMySQL<Authors[]>("SELECT * FROM Authors WHERE id =?", [id]);

const create = (new_author: Authors) => TalkToMySQL('INSERT INTO Authors SET ?', [new_author]);

const update = (author: Authors, id: Authors['id']) => TalkToMySQL('UPDATE Authors SET ? WHERE id=?', [author, id]);

const destroy = (id: Authors['id']) => TalkToMySQL('DELETE FROM Authors WHERE id=?', [id]);

export default {
    get_all,
    get_one_by_id,
    create,
    update, 
    destroy

};
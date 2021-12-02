import { TalkToMySQL } from "../index";
import { Tags, BlogTagsJoined, BlogTags } from "../../types";
import {tokenCheck} from '../../middlewares/tokenCheck.mw'



const get_all = () => TalkToMySQL<Tags[]>(
    `SELECT name, id, _created FROM Tags `);

const create = (new_tag: Tags) => TalkToMySQL(
    `INSERT INTO Tags SET ? `, [new_tag]);



/// need to delete blogtag id AND blogid( blogtag query deletes blogid)

const destroy = (id: Tags['id']) => TalkToMySQL(
    `DELETE FROM Tags WHERE id=?`, [id]);



// GET all tags by ID - NOT USED
const get_one_by_id = (id: number) => TalkToMySQL<BlogTagsJoined[]>
    (`CALL spGetBlogById(?) `, [id]);



export default {
    get_all,
    create,
    destroy

};
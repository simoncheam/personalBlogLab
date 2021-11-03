import { TalkToMySQL } from "../index";
import { Blogs, BlogTagsJoined, BlogTags } from "../../types";


const get_all = (blogid: number) => TalkToMySQL<BlogTagsJoined[]>(
    `SELECT * FROM BlogTags `[blogid]);


const create = (tagid: BlogTags['tagid'], blogid: BlogTags['blogid']) => TalkToMySQL(
    `INSERT INTO BlogTags SET ? `, [{ tagid, blogid }]);

// note: blogid: BlogTags['blogid'] is more specific


const update = (tagid: BlogTags['tagid'], blogid: BlogTags['blogid']) => TalkToMySQL(
    `UPDATE BlogTags SET tagid=? WHERE blogid=? `, [tagid, blogid]);


/// need to delete blogtag id AND blogid( need blogtag query to delete blogid)

const destroy = (blogid: BlogTags['blogid']) => TalkToMySQL("DELETE FROM BlogTags WHERE blogid=?", [blogid]);



export default {
    get_all,
    create,
    destroy,
    update

};
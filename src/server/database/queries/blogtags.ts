import {TalkToMySQL} from "../index";
import {Blogs, BlogTagsJoined, BlogTags} from "../../types";

const get_all = (blogid: number) => TalkToMySQL<BlogTagsJoined[]>(
    `SELECT t.id as tag_id, t.name as tag_name, BT.blogid as blog_id, BT.tagid as blogtag_id, BT._created
    FROM Tags t JOIN BlogTags BT
    ON t.id = BT.tagid 
    WHERE BT.blogid=?
    ORDER BY t._created DESC `[blogid]);





const create = (tagid: BlogTags['tagid'], blogid: BlogTags['blogid']) => TalkToMySQL(`INSERT INTO BlogTags SET ? `, [{tagid, blogid}]); 

        // note: blogid: BlogTags['blogid'] is more specific
    
    

/// need to delete blogtag id AND blogid( need blogtag query to delete blogid)

const destroy = (blogid: BlogTags['blogid'])=> TalkToMySQL("DELETE FROM BlogTags WHERE blogid=?", [blogid]);





//You only need to join BlogTags and Tags

/*

SQL Join code (Tags JOIN BlogTags) - get_all for BlogTagsJoined

SELECT t.id as tag_id, t.name as tag_name, BT.blogid as blog_id, BT.tagid as blogtag_id, T._created
FROM Tags t JOIN BlogTags BT
ON t.id = BT.tagid ORDER BY t._created DESC

//for a blogid

*/

export default {
    get_all,
    // get_one_by_id,
    create,
    // update, 
    destroy

};
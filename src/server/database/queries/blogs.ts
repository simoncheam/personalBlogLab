import {TalkToMySQL} from "../index";
import {Blogs, BlogTags, BlogTagsJoined} from "../../types";

const get_all = () => TalkToMySQL<Blogs[]>
(`SELECT * FROM Blogs`);

const get_one_by_id = (id:number)=>TalkToMySQL<Blogs[]>
(`SELECT * FROM Blogs WHERE id=?`,[id]);

// need: Your blog insert will result in an id response from mysql, 
//use that to insert your blog id and tag id into your blogtags table!

const create = (new_blog: Blogs) => {

   return TalkToMySQL(`INSERT INTO Blogs SET ?`, [new_blog]); 

}



// INSERT INTO BlogTags SET ? WHERE BlogTag.tagid=?


const update = (blog: Blogs, id: Blogs['id'])=>TalkToMySQL("UPDATE Blogs SET ? WHERE id=?", [blog, id]);

const destroy = (id: Blogs['id'])=> TalkToMySQL("DELETE FROM Blogs WHERE id=?", [id]);
//const destroy = (id: number)=> TalkToMySQL("DELETE FROM Blogs WHERE id=?", [id]);

/// need to delete  blogid( need blogtag query to delete blogid)

export default {
    get_all,
    get_one_by_id,
    create,
    update,
    destroy
};

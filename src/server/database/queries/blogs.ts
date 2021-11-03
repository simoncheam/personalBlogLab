import {TalkToMySQL} from "../index";
import {Blogs, BlogTags, BlogTagsJoined} from "../../types";

// const get_all = () => TalkToMySQL<BlogTagsJoined[]>
// (`CALL spGetAllBlogsJoined()`);


const get_all = () => TalkToMySQL<Blogs[]>
(`SELECT * FROM Blogs`);


/* ORIGINAL FUNCTION - get one by ID
const get_one_by_id = (id:number)=>TalkToMySQL<BlogTagsJoined[]>
(
    `SELECT BlogTags.blogid as blog_id, BlogTags.tagid as tag_id,
        b.title as title, b.content as content, b._created as blog_created,
        a.name as a_name,a.email as a_email, 
        t.name as tag_name, t._created as tag_created 
        FROM BlogTags
            JOIN Tags t
            ON t.id=BlogTags.tagid
                JOIN Blogs b
                ON b.id=BlogTags.blogid
                    JOIN Authors a
                    ON b.authorid=a.id WHERE BlogTags.blogid=?`,[id]);
*/

// NEW Stored Procedure:
const get_one_by_id = (id:number)=>TalkToMySQL<BlogTagsJoined[]>
(`CALL spGetBlogById(?) `,[id]);

// NOTES:  FROM MYSQL - SP creation:
/*
DELIMITER //
CREATE PROCEDURE spGetBlogById(spblogid INT)
	BEGIN
		SELECT BlogTags.blogid as blog_id, BlogTags.tagid as tag_id,
        b.title as title, b.content as content, b._created as blog_created,
        a.name as a_name,a.email as a_email, 
        t.name as tag_name, t._created as tag_created 
        FROM BlogTags
            JOIN Tags t
            ON t.id=BlogTags.tagid
                JOIN Blogs b
                ON b.id=BlogTags.blogid
                    JOIN Authors a
                    ON b.authorid=a.id
                    WHERE BlogTags.blogid=spblogid;
    END //

DELIMITER //;
*/

///------------------------------------

const get_all_by_tagid = (id:number)=>TalkToMySQL<BlogTagsJoined[]>
(`CALL spGetBlogsByTagId(?) `,[id]);

const get_all_by_authorid = (id:number)=>TalkToMySQL<BlogTagsJoined[]>
(`CALL spGetBlogsByAuthorId(?) `,[id]);

///------------------------------------

// note: blog insert will result in an id response from mysql, 
//use that to insert your blog id and tag id into your blogtags table!

const create = (new_blog: Blogs) => {
   return TalkToMySQL(`INSERT INTO Blogs SET ?`, [new_blog]); 
}

const update = (blog: Blogs, id: Blogs['id'])=>TalkToMySQL("UPDATE Blogs SET ? WHERE id=?", [blog, id]);

const destroy = (id: Blogs['id'])=> TalkToMySQL("DELETE FROM Blogs WHERE id=?", [id]);



export default {
    get_all,
    get_one_by_id,
    get_all_by_tagid,
    get_all_by_authorid,
    create,
    update,
    destroy
};

import blogz from '../../database/queries/blogs';
import blogtagz from '../../database/queries/blogtags';
import * as express from 'express';
import { Blogs, Authors, BlogTagsJoined, BlogTags, ReqUser } from '../../types'
import {tokenCheck} from '../../middlewares/tokenCheck.mw'
import {authorCheck} from '../../middlewares/authorCheck.mw'


const router = express.Router();

// get all blogs

router.get('/', async (req, res) => {

    try {
        const all_blogs = await blogz.get_all();
        res.status(200).json(all_blogs);

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
});

router.get('/browse', async (req, res) => {

    try {
        const all_blogs = await blogz.get_all();
        res.status(200).json(all_blogs);

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
});


// get all blogs by an authorid

router.get('/browseauthors/:authorid', async (req, res) => {

    const authorid = req.params.authorid;

    try {

        const all_blogs_by_author = await blogz.get_all_by_authorid(Number(authorid));
        res.status(200).json(all_blogs_by_author);

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });

    }
})


// get all blogs by tagid - Used for Browse View
router.get('/browse/:tagid', async (req, res) => {

    const tagid = req.params.tagid;

    try {
        const all_blogs_tagged = await blogz.get_all_by_tagid(Number(tagid));
        res.status(200).json(all_blogs_tagged);


    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

});


// get one

router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const [one_blog] = await blogz.get_one_by_id(Number(id));

        if (!one_blog) {
            res.status(404).json({ message: "Blog not found!" })
        } else {
            res.status(200).json(one_blog);
        }
    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

// Create

router.post('/', tokenCheck, async (req: ReqUser, res) => {

    
    const { tagid, title, content, authorid } = req.body;
    console.log('req.user:'); 
    console.log(req.user);

    //This is it!
    console.log('req.user.userid:'); 
    console.log(req.user.userid);


    console.log('INSIDE POST BLOCK');

    console.log(`req.userid is: ${req.userid}`); //undefined
    console.log(`req.user[0] is: ${req.user[0]}`); //undefined
    console.log(`req.user.id is: ${req.user.id}`); //undefined


    console.log(`authorid is: ${authorid}`);
    
    // author- user check (cannot impersonate another user)
    if(authorid !== req.user.userid) {
        console.log('FUCK YOU IMPERSONATOR! GTFO');
        return
    }


    //const {token} = req.headers.authorization
    console.log('Router -Post TOKEN CHECK HERE');
  

    //input validation
    if (!content || !title || !tagid) {  //    "authorid": 1,
        return res.status(400).json({ message: "Fill out everything!" })
    }

    
    try {

        const blogResults = await blogz.create({ title, content, authorid });

        //adds tagid with returned blogid to blogtags table (many to many relationship)
        await blogtagz.create(tagid, blogResults.insertId);

        res.status(201).json({ message: "Blog created", id: blogResults.insertId });

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

});



// update blog

router.put('/:id',tokenCheck, authorCheck, async (req: ReqUser, res) => {

    const { title, content, authorid, a_id, tagid } = req.body; 
    console.log(`req.userid : ${req.userid}`);

    console.log({ title, content, authorid });// WORKS!
    //console.log({ title, content, a_id });
    console.log('INSIDE BLOG PUT ROUTER!');



    if (!title || !content || !authorid) {
        return res.status(400).json({ message: "Fill out everything!" })
    }

    try {
        const id = Number(req.params.id);
        const resultz = await blogz.update({ title, content, authorid }, id);
        const blogid = id;
        await blogtagz.update(tagid, blogid)
        console.log('INSIDE TRY BLOCK - BLOG PUT ROUTER!');

        res.status(201).json({ message: "Updated Blog!" });

    } catch (error) {
        console.log('INSIDE CATCH BLOCK - BLOG PUT ROUTER!');

        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
});




// delete

router.delete('/:id', tokenCheck,authorCheck, async (req, res) => {

    const id = Number(req.params.id);

    const { tagid } = req.body;
    


    try {

        // we need to delete: 

        await blogtagz.destroy(id) //needs to be deleted first tagid: BlogTags['tagid'], blogid: BlogTags['blogid']

        await blogz.destroy(id)  /// need to delete blogtag id AND blogid( need blogtag query to delete blogid)  , 

        res.status(200).json({ message: "Deleted Blog!" });

    } catch (error) {
        res.status(500).json({ message: "A server error occurred", error: error.sqlMessage });
    }
})

export default router;
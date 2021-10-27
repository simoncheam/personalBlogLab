import blogz from '../database/queries/blogs';
import blogtagz from '../database/queries/blogtags';
import * as express from 'express';
import {Blogs, Authors, BlogTagsJoined, BlogTags} from '../types'




const router = express.Router();

// get all blogs

router.get('/', async (req,res) => {

    try {
        const all_blogs = await blogz.get_all();
        res.status(200).json(all_blogs);
        
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );




// get one

router.get('/:id', async(req,res) => {

    const id = req.params.id;

    try {

        const [one_blog] = await blogz.get_one_by_id(Number(id));

        if (!one_blog) {
            res.status(404).json({message:"Blog not found!"})
            
        } else {
            res.status(200).json(one_blog);
            
        }
    
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
        
    }



})

// Create

router.post('/', async (req, res)=>{

    //tagid is loaded on the page
    
    const {tagid, title, content, authorid} = req.body;

    //const [author] = await authorz.get_one_by_id(authorid); // may not be needed
    //input validation
    if( !content || !title || !tagid){  //    "authorid": 1,
        return res.status(400).json({message:"Fill out everything!"})
    }

// update authorid(hardcode =1) - postman

    try {

        const blogResults = await blogz.create({ title, content, authorid});

        
        // Need to create a blogtags create query

        await blogtagz.create(tagid, blogResults.insertId);

       
        
        
        
       //trying to understand placement/order of ops with multiple queries?
       
       res.status(201).json({message: "Blog created", id: blogResults.insertId});

        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});        
    }


});





// update

router.put('/:id', async (req,res) => {

    const {title, content, authorid }:Blogs =req.body;
    console.log({title, content, authorid });  
    
    if(!title || !content || !authorid){  
        return res.status(400).json({message:"Fill out everything!"})
    }
    
    try {
        const id = Number(req.params.id);
        const resultz = await blogz.update({title, content, authorid }, id);
        res.status(201).json({message: "Updated Blog!"});
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }
} );




// delete

router.delete('/:id', async(req,res) =>{

    const id = Number(req.params.id);
    try {
        
        // we need to delete: 

        await blogtagz.destroy(id) //needs to be deleted first

        await blogz.destroy(id)  /// need to delete blogtag id AND blogid( need blogtag query to delete blogid)  , 
        // on delete cascade for blogtags table(blog id)

        res.status(200).json({message: "Deleted Blog!"}); 
        
    } catch (error) {
        res.status(500).json({message: "A server error occurred", error: error.sqlMessage});
    }
})




export default router;
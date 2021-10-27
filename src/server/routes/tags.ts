import blogz from '../database/queries/blogs';
import blogtagz from '../database/queries/blogtags';

import * as express from 'express';
import {Tags, Blogs, Authors, BlogTagsJoined, BlogTags} from '../types'


const router = express.Router();

// get all tags --- WIP

router.get('/', async (req,res) => {

    try {
        const all_tags = await blogz.get_all();
        res.status(200).json(all_tags);
        
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );
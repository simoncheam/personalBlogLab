import * as express from 'express';


const router = express.Router();

router.post('/', async (req,res)=>{

    try {
        res.json({message: 'email yay!'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'oh shit'})
    }
});

export default router;
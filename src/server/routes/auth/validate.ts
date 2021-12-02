
// note: this is a made up auth route that goes through tokenCheck mw to prevent token forgery. There may be a better way to do this.


import { Router } from 'express';
import { tokenCheck } from '../../middlewares/tokenCheck.mw';
import { ReqUser } from "../../types";
import authorz from '../../database/queries/authors';

const router = Router();


router.get('/', tokenCheck, async (req: ReqUser, res) => {

    const id = req.user.userid;
    //const {name} = req.user.name;
    console.log(Number(id));


    try {
        console.log('AUTH VALIDATION - TRY BLOCK');

        const [one_author] = await authorz.get_one_by_id(Number(id));
        delete one_author.password;

        if (!one_author) {
            res.status(404).json({ message: "User not found!" })
        } else {

            return res.status(200).json({ message: `Welcome ! `, one_author });

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})


export default router;
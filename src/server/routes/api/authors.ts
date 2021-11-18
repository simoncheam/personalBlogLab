import authorz from '../../database/queries/authors';
import * as express from 'express';
import { Authors } from '../../types'
import {tokenCheck} from '../../middlewares/tokenCheck.mw'


const router = express.Router();

router.route('*')
.post(tokenCheck)
.put(tokenCheck)
.delete(tokenCheck)


//get all

router.get('/', async (req, res) => {

    try {
        const all_authors = await authorz.get_all();
        res.status(200).json(all_authors)

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})

//get one by id

router.get('/:id', async (req, res) => {

    const id = req.params.id;;

    try {

        const [one_author] = await authorz.get_one_by_id(Number(id));

        if (!one_author) {
            res.status(404).json({ message: "User not found!" })
        } else {
            res.status(200).json(one_author);
        }

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})

router.post('/', async (req, res) => {

    const { name, email }: Authors = req.body;

    if (!name || !email) {  // input validation
        return res.status(400).json({ message: "Fill out everything!" })
    }

    try {

        const authorResultz = await authorz.create({ name, email })
        res.status(201).json({ message: "Blog created", id: authorResultz.insertId });

    } catch (error) {
        res.status(500).json({ message: " A server error occurred", error: error.sqlMessage });
    }

});

router.put('/:id', async (req, res) => {

    const id = Number(req.params.id);

    const { name, email }: Authors = req.body;

    if (!name || !email) {  // input validation
        return res.status(400).json({ message: "Fill out everything!" })
    }

    try {
        const authorResultz = await authorz.update({ id, name, email }, id)

    } catch (error) {
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
});

//DELETE

router.delete('/:id', async (req, res) => {

    const id = Number(req.params.id);

    try {
        await authorz.destroy(id);
        res.status(200).json({ message: "Deleted User!" });
    } catch (error) {
        res.status(500).json({ message: "A server error occurred", error: error.sqlMessage });
    }
});


export default router;
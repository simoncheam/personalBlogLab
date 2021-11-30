import * as express from 'express';
import routes from './routes';
import * as path from 'path';
import {configurePassport} from '../server/middlewares/passport-strats.mw'
import * as passport from 'passport';
const app = express();

const cool = require('cool-ascii-faces');

configurePassport(app); // !import mw function - TS side effect



app.use(passport.initialize());

//app.use(cors());
app.use(express.json());

app.get('/status', (req,res)=> res.sendStatus(200));
app.head('/status', (req,res)=> res.sendStatus(200));

app.use(express.static('public'));
app.use(routes);  /// !!! changes to routes

app.get('*', (req,res) =>{ res.sendFile(path.join(__dirname, '../public/index.html'))

});

//heroku testing
app
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))
.get('/cool', (req, res) => res.send(cool()))


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

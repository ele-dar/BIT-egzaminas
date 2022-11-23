import express from "express";
import bcrypt from 'bcrypt';
import db from '../database/connect.js';
import { userValidator, loginValidator } from "../middleware/validate.js";

const router = express.Router();

router.post('/register', userValidator, async (req, res) => {
    try {
        const userExists = await db.Users.findOne({ where: { email: req.body.email } });
        if (userExists) {
            res.status(401).send('Vartotojas su tokiu el.paštu jau egzistuoja');
            return;
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await db.Users.create(req.body);
        res.send('Registracija sėkminga!');
    } catch (e) {
        console.log(e);
        res.status(500).send('Įvyko vidinė serverio klaida...');
    }
});

router.post('/login', loginValidator, async (req, res) => {
    try {
        const user = await db.Users.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).send('Toks vartotojas nerastas');
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.loggedin = true;
            req.session.user = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            };
            res.send({ message: 'Prisijungimas sėkmingas!', user: req.session.user });
        } else {
            res.status(401).send('Neteisingai užpildyti duomenys...');
        }
    } catch (e) {
        console.log(e);
        res.status(500).send('Įvyko vidinė serverio klaida...');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Sėkmingai atsijungėte, lauksime sugrįžtant');
});

router.get('/check-auth', async (req, res) => {
    res.json(req.session.user);
});

export default router;

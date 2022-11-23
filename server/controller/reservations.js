import express from 'express';
import db from '../database/connect.js';
// import { reservationValidator } from '../middleware/validate.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const reservations = await db.Reservations.findAll();
        res.json(reservations);
    } catch (e) {
        console.log(e);
        res.status(500).send('Įvyko vidinė serverio klaida');
    }
});
// router.get('/single/:id', async (req, res) => {
//     try {
//         const book = await db.Books.findByPk(req.params.id);
//         res.json(book);
//     } catch (e) {
//         console.log(e);
//         res.status(500).send('Įvyko vidinė serverio klaida');
//     }
// });
// router.post('/new', bookValidator, async (req, res) => {
//     try {
//         await db.Books.create(req.body);
//         res.send('Pridėtas naujas įrašas');
//     } catch (e) {
//         console.log(e);
//         res.status(500).send('Įvyko vidinė serverio klaida');
//     }
// });

// router.put('/edit/:id', bookValidator, async (req, res) => {
//     try {
//         const book = await db.Books.findByPk(req.params.id);
//         await book.update(req.body);
//         res.send('Duomenys atnaujinti');
//     } catch (e) {
//         console.log(e);
//         res.status(500).send('Įvyko vidinė serverio klaida');
//     }
// });
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const book = await db.Books.findByPk(req.params.id);
//         await book.destroy();
//         res.send('Informacija ištrinta');
//     } catch (e) {
//         console.log(e);
//         res.status(500).send('Įvyko vidinė serverio klaida');
//     }
// });

export default router


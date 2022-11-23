import express from 'express';
import session from 'express-session';
import cors from 'cors';
// controlerių importavimas:
import users from './controller/users.js';
import books from './controller/books.js';
// import reservations from './controller/reservations.js';

const app = express();

// CORS konfigūracija (blokavimo nuėmimas)
app.use(cors());

// Duomenų priėmimas POST metodu
app.use(express.urlencoded({ extended: true }));

// Duomenų priėmimas JSON formatu
app.use(express.json());

// Statinių failų (nuotraukų) naudojimas
app.use('/uploads', express.static('uploads'));

// Sesijos konfigūracija
app.set('trust proxy', 1);
app.use(session({
    secret: 'vardas - auksinis kardas',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 600000
    }
}));

// Kontrolerių priskyrimas
app.use('/api/users/', users);
app.use('/api/books/', books);
// app.use('/api/reservations/', reservations);

app.listen(3000);

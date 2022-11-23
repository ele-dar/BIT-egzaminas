import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
// Modelių importas
import Users from '../model/users.js';
import Books from '../model/books.js';

const database = {};
const credentials = {
    database: 'Biblioteka',
    host: 'localhost',
    user: 'root',
    password: ''
};

try {
    // SQL prisijungimas
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    });

    // SQL duomenų bazės sukūrimas
    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database);

    // Sequelize prisijungimas prie duomenų bazės
    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, { dialect: 'mysql' });

    // Modelių priskyrimas su sequelize
    database.Users = Users(sequelize);
    database.Books = Books(sequelize);

    //Reliacijų kūrimas:
    database.Users.hasMany(database.Books);
    database.Books.belongsTo(database.Users);


    // Sequelize duomenų bazės atnaujinimas
    await sequelize.sync({ alter: false });

} catch (e) {
    console.log(e);
    console.log('Nepavyko prisijungti prie duomenų bazės');
}

export default database;

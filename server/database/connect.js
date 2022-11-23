import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
// Modelių importas
import Users from '../model/users.js';

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

    //Reliacijų kūrimas:
    // database.Users.hasMany(database.Stories)
    // database.Stories.belongsTo(database.Users)

    // Sequelize duomenų bazės atnaujinimas
    await sequelize.sync({ alter: true });

} catch (e) {
    console.log(e);
    console.log('Nepavyko prisijungti prie duomenų bazės');
}

export default database;

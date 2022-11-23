import { DataTypes } from 'sequelize';

const Books = (sequelize) => {
    const Schema = {
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };

    return sequelize.define('books', Schema);
};

export default Books;

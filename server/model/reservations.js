import { DataTypes } from 'sequelize';

const Reservations = (sequelize) => {
    const Schema = {
        returnDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: new Date(),
        }
    };

    return sequelize.define('reservations', Schema);
};

export default Reservations;

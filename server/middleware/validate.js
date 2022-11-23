import Joi from 'joi';

const validate = (schema, req, res, next) => {
    const options = {
        abortEarly: true,
        stripUnknown: true,
    };
    const { error, value } = schema.validate(req.body, options);
    let message = '';
    if (error) {
        switch (error.details[0].path[0]) {
            case 'first_name':
                message = 'Vardas turi būti 2-20 simbolių ilgio';
                break;
            case 'last_name':
                message = 'Pavardė turi būti 2-20 simbolių ilgio';
                break;
            case 'email':
                message = 'Netinkamas el.pašto adresas';
                break;
            case 'password':
                message = 'Slaptažodis turi būti 6-12 simbolių ilgio';
                break;
            case 'author':
                message = 'Būtina įvesti knygos autorių';
                break;
            case 'title':
                message = 'Būtina įvesti knygos pavadinimą';
                break;
            case 'category':
                message = 'Būtina pasirinkti knygos kategoriją';
                break;
            default:
                message = 'Neteisingai užpildyti laukeliai';
        }
        console.log(error.details[0].path[0]);
        return res.status(400).send(message);
    }
    req.body = value;
    next();
};

export const userValidator = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(20).required(),
        last_name: Joi.string().min(2).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(12).required(),
    });
    validate(schema, req, res, next);
};

export const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    validate(schema, req, res, next);
};

export const bookValidator = (req, res, next) => {
    const schema = Joi.object({
        author: Joi.string().required(),
        title: Joi.string().required(),
        category: Joi.string().required(),
        isReserved: Joi.bool(),
        returnDate: Joi.date().allow(null),
        userId: Joi.number().integer().allow(null)
    });
    validate(schema, req, res, next);
};

export default validate;

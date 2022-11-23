export const auth = (req, res, next) => {
    if (req.session.loggedin)
        return next();
    res.status(401).send('Sesijos laikas pasibaigė');
};

export const adminAuth = (req, res, next) => {
    console.log(req.session);
    if (req.session.user.role === 1)
        return next();
    res.status(401).send('Sesijos laikas pasibaigė');
};

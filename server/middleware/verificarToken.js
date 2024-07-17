const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const verificarToken = ((req, res, next) => {
    const token_user = req.headers.token_user;

    jwt.verify(token_user, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalido o expirado' });
        }

        req.infoUser = {
            id: decoded.id,
            username: decoded.username
        }
        next();
    });
});

module.exports = verificarToken;
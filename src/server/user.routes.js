const { registUser, loginUser } = require('../controllers/user.controller');

const userRoutes = [
    {
        method: 'POST',
        path: '/api/users/register',
        handler: registUser,
    },
    {
        method: 'POST',
        path: '/api/users/login',
        handler: loginUser,
    },
];

module.exports = userRoutes;
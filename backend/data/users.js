import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin User",
        email: "admin@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Walt White",
        email: "walt@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "Jesse Pinkman",
        email: "jesse@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
];

export default users;
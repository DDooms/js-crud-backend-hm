const pool = require('../../db');
const queries = require('./queries');
const { rows } = require("pg/lib/defaults");

const getUsers = async (req, res) => {
    try {
        const result = await pool.query(queries.getUsers);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// async/await are used for promises,
// because the pool.query() method typically returns a promise in order to handle asynchronous operations.

const getUserByUsername = async (req, res) => {
    const username = req.params;
    try {
        const result = await pool.query(queries.getUserByUsername, [username]);
        if (result.rows.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.status(200).json(result.rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// [username], by wrapping the dynamic argument with [], you can pass an actual username

const addUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const usernameCheck = await pool.query(queries.checkIfUsernameExists, [username]);
        const emailExistsCheck = await pool.query(queries.checkIfEmailExists, [email]);

        if (!email.match(/^[^@]+@[^@]+\.[^.]+$/)) {
            res.status(400).send("Invalid email format");
        } else if (emailExistsCheck.rows.length) {
            res.status(409).send("Email already exists");
        } else if (usernameCheck.rows.length) {
            res.status(409).send("Username already exists");
        } else {
            await pool.query(queries.addUser, [username, email, password]);
            res.status(201).send("User created successfully");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/*const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, surname, username, email, dob } = req.body;

    try {
        const user = await pool.query(queries.getUserById, [id]);
        if (user.rows.length === 0) {
            res.status(404).send("User not found");
            return;
        }

        await pool.query(queries.updateUser, [name, surname, username, email, dob, id]);
        res.status(200).send("User successfully updated");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};*/

const deleteUser = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await pool.query(queries.getUserByUsername, [username]);

        if (user.rows.length === 0) {
            res.status(404).send("User not found");
            return;
        }

        await pool.query(queries.deleteUser, [username]);
        res.status(200).send("User successfully deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (username.length === 0) {
        res.status(400).send("Enter a Username!");
        return;
    }

    if (username.length < 3) {
        res.status(400).send("Username must be at least 3 symbols!");
        return;
    }

    /*if (confirm_password && password !== confirm_password) {
        res.status(400).send("Passwords don't match!");
        return;
    }*/

    try {
        const usernameCheck = await pool.query(queries.checkIfUsernameExists, [username]);
        const emailExistsCheck = await pool.query(queries.checkIfEmailExists, [email]);

        if (!email.match(/^[^@]+@[^@]+\.[^.]+$/)) {
            res.status(400).send("Invalid email format");
        } else if (emailExistsCheck.rows.length) {
            res.status(409).send("Email already exists");
        } else if (usernameCheck.rows.length) {
            res.status(409).send("Username already exists");
        } else {
            await pool.query(queries.addUser, [username, email, password]);
            res.status(201).send("User registered successfully");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query(queries.getUserByEmail, [email]);

        if (user.rows.length === 0) {
            res.status(404).send("User not found");
            return;
        }

        if (user.rows[0].password !== password) {
            res.status(401).send("Invalid password");
            return;
        }

        res.status(200).send("Login successful");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = {
    getUsers,
    getUserByUsername,
    addUser,
    // updateUser,
    deleteUser,
    registerUser,
    loginUser,
};

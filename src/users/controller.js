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

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query(queries.getUserById, [id]);
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

// [id], by wrapping the dynamic argument with [], you can pass an actual ID

const addUser = async (req, res) => {
    const { name, surname, username, email, dob } = req.body;

    try {
        const result = await pool.query(queries.checkIfEmailExists, [email]);
        if (result.rows.length) {
            res.status(409).send("Email already exists");
        } else {
            await pool.query(queries.addUser, [name, surname, username, email, dob]);
            res.status(201).send("User created successfully");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const updateUser = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = await pool.query(queries.getUserById, [id]);
        if (user.rows.length === 0) {
            res.status(404).send("User not found");
            return;
        }

        await pool.query(queries.deleteUser, [id]);
        res.status(200).send("User successfully deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
};

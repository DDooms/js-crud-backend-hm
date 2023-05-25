const getUsers = "SELECT * FROM users ORDER BY id"
const getUserById = "select * from users where id = $1"
const checkIfEmailExists = "select s from users s where s.email = $1"
const addUser = "insert into users (name, surname, username, email, dob) values ($1, $2, $3, $4, $5)"
const updateUser = "UPDATE users SET name = $1, surname = $2, username = $3, email = $4, dob = $5 WHERE id = $6";
const deleteUser = "delete from users where id = $1"

module.exports = {
    getUsers,
    getUserById,
    checkIfEmailExists,
    addUser,
    updateUser,
    deleteUser,
}
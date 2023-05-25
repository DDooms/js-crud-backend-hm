const getUsers = "SELECT * FROM userDB ORDER BY id"
const getUserByUsername = "select * from userDB where username = $1"
const getUserByEmail = "select * from userDB where email = $1"
const checkIfEmailExists = "select s from userDB s where s.email = $1"
const checkIfEmailIsValid = "SELECT s FROM userDB s WHERE s.email ~ = $1";
const checkIfUsernameExists = "select s from userDB s where s.username = $1"
const addUser = "insert into userDB (username, email, password) values ($1, $2, $3)"
const updateUser = "UPDATE userDB SET name = $1, surname = $2, username = $3, email = $4, dob = $5 WHERE id = $6";
const deleteUser = "delete from userDB where username = $1"

module.exports = {
    getUsers,
    getUserByUsername,
    getUserByEmail,
    checkIfEmailExists,
    checkIfEmailIsValid,
    checkIfUsernameExists,
    addUser,
    updateUser,
    deleteUser,
}
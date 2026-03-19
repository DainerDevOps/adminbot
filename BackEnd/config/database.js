import mysql2 from "mysql2/promise"

const database = mysql2.createPool({
    host: "",
    user : "",
    password: "",
    database: ""
})

export default database
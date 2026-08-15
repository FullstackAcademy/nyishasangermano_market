import bcrypt from "bcrypt";
import db from "#db/client";

export async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const SQL = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const response = await db.query(SQL, [username, hashedPassword]);
    return response.rows[0];
}

export async function getUserById(id) {
    const SQL = `
        SELECT *
        FROM users
        WHERE id = $1;
    `;
    const {rows:[user], } = await db.query(SQL, [id]);
    return user;
}

export async function getUserByUsername(username) {
    const SQL = `
        SELECT *
        FROM users
        WHERE username = $1;
    `;
    const {rows:[user], } = await db.query(SQL, [username]);
    return user;
}
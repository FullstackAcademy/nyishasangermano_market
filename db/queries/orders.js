import db from "#db/client";

export async function createOrder(date, note, user_id) {
    const SQL = `
        INSERT INTO orders (date, note, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const response = await db.query(SQL, [date, note, user_id]);
    return response.rows[0];
}

export async function getOrdersByUserId(user_id) {
    const SQL = `
        SELECT *
        FROM orders
        WHERE user_id = $1;
    `;
    const response = await db.query(SQL, [user_id]); 
    return response.rows;
}

export async function getOrderById(id) {
    const SQL = `
    SELECT * 
    FROM orders
    WHERE id = $1;
    `;
    const {rows:[order],} = await db.query(SQL, [id]);
    return order;
}

export async function getOrdersByProductAndUser(product_id, user_id) {
    const SQL = `
        SELECT orders.*
        FROM orders
        JOIN orders_products ON orders.id = orders_products.order_id
        WHERE orders_products.product_id = $1
        AND orders.user_id = $2;
    `;
    const response = await db.query(SQL, [product_id, user_id]);
    return response.rows;
}
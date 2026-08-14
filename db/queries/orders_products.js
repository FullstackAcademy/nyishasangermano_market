import db from "#db/client";

export async function addProductToOrder(order_id, product_id, quantity) {
  const SQL = `
    INSERT INTO orders_products (order_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;

  const response = await db.query(SQL, [order_id, product_id, quantity]);
  return response.rows[0];
}

export async function getProductsByOrderId(order_id) {
  const SQL = `
    SELECT products.*
    FROM products
    JOIN orders_products ON products.id = orders_products.product_id
    WHERE orders_products.order_id = $1;
    `;

    const response = await db.query(SQL, [order_id]);
    return response.rows;
}

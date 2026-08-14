import db from "#db/client";

import {createUser} from "#db/queries/users";
import {createProduct} from "#db/queries/products";
import {createOrder} from "#db/queries/orders";
import {addProductToOrder} from "#db/queries/orders_products";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user = await createUser("testuser", "password123");

  const products = [];
  for (let i=1; i<=12; i++) {
    const product = await createProduct(
      "Product " + i,
      "Description for product " + i, 
      (i * 4.5).toFixed(2),
    );
    products.push(product);
  }
  const order = await createOrder("2026-01-15", "First order", user.id);

  for (let i=0; i<6; i++) {
    await addProductToOrder(order.id, products[i].id, i+1);
  }
}
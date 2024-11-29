# Rale.co E-Commerce Platform Database Schema

This repository contains the database schema for Rale.co company. The schema is modeled using **Prisma ORM** with a PostgreSQL database. Below is the Entity Relationship Diagram (ERD) and a detailed breakdown of the schema.

---

## ERD

![ERD Diagram](./ERD.png)  
*Figure 1: Entity Relationship Diagram (ERD)*

---

## Database Schema Overview

The database schema consists of the following entities:

| **Entity**         | **Description**                                                                 |
|---------------------|---------------------------------------------------------------------------------|
| `User`             | Stores user information, including login credentials and roles.                |
| `Product`          | Represents products available in the store with attributes like price, category.|
| `Address`          | Stores user addresses for shipping purposes.                                   |
| `Order`            | Stores order details and their statuses.                                       |
| `Order_Item`       | Represents items in an order, linked to the inventory.                         |
| `Shopping_Cart`    | Manages active carts for users, storing items before checkout.                 |
| `Cart_Item`        | Represents individual items in a shopping cart.                                |
| `Product_Review`   | Stores user reviews for products.                                              |
| `Product_Inventory`| Tracks product stock and size availability.                                    |
| `Size`             | Represents product sizes (e.g., Small, Medium, Large).                        |

---

## dotenv Required Variables

| **Variable Name**  | **Value**                                                                      |
|---------------------|---------------------------------------------------------------------------------|
| `DATABASE_URL`     | postgres://[db-user].[project-ref]:[db-password]@aws-0-[aws-region].pooler.supabase.com:6543/[db-name]?pgbouncer=true&connection_limit=1|
| `DIRECT_URL`       | postgres://[db-user].[project-ref]:[db-password]@aws-0-[aws-region].pooler.supabase.com:5432/[db-name]|
| `JWT_SECRET`       | Any secret key value                                                           |
| `PORT`             | Any port value                                                                 |

---

## Database API Routes

Below is a summary of the database tables, their associated API routes, supported CRUD operations, and required request header types:

Format: `localhost:[PORT]/[Route]`  
Example: `localhost:3000/user/editDetails/3`

<table>
<thead>
<tr>
<th><strong>Table</strong></th>
<th><strong>Route/s</strong></th>
<th><strong>Operation/s</strong></th>
<th><strong>Request Header Type</strong></th>
<th><strong>Request Body</strong></th>
<th><strong>Authentication</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>User</strong></td>
<td><code>/user/{id}</code></td>
<td><strong>Displays</strong> user details by ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/user/register</code></td>
<td><strong>Registers</strong> a new user</td>
<td><code>POST</code></td>
<td><code>{ &quot;email&quot;: &quot;user@mail.com&quot;, &quot;username&quot;: &quot;user&quot;, &quot;password&quot;: &quot;pass&quot;, &quot;phoneNumber&quot;: &quot;number&quot;, &quot;userFirstName&quot;: &quot;John&quot;, &quot;userLastName&quot;: &quot;Doe&quot; }</code></td>
<td>No</td>
</tr>
<tr>
<td></td>
<td><code>/user/login</code></td>
<td><strong>Logs in</strong> a user</td>
<td><code>POST</code></td>
<td><code>{ &quot;email&quot;: &quot;user@mail.com&quot;, &quot;password&quot;: &quot;pass&quot; }</code></td>
<td>No</td>
</tr>
<tr>
<td></td>
<td><code>/user/editDetails/{id}</code></td>
<td><strong>Edits</strong> user details by ID</td>
<td><code>PUT</code></td>
<td><code>{ &quot;email&quot;: &quot;newemail@mail.com&quot;, &quot;phoneNumber&quot;: &quot;newnumber&quot;, &quot;userFirstName&quot;: &quot;NewFirstName&quot;, &quot;userLastName&quot;: &quot;NewLastName&quot; }</code></td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/user/editPassword/{id}</code></td>
<td><strong>Edits</strong> user password by ID</td>
<td><code>PUT</code></td>
<td><code>{ &quot;password&quot;: &quot;newpassword&quot; }</code></td>
<td>Yes</td>
</tr>
<tr>
<td><strong>Product</strong></td>
<td><code>/product</code></td>
<td><strong>Displays</strong> all products</td>
<td><code>GET</code></td>
<td>None</td>
<td>No</td>
</tr>
<tr>
<td></td>
<td><code>/product/{id}</code></td>
<td><strong>Displays</strong> a product by ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>No</td>
</tr>
<tr>
<td></td>
<td><code>/product/add</code></td>
<td><strong>Adds</strong> a new product</td>
<td><code>POST</code></td>
<td><code>{ &quot;name&quot;: &quot;ProductName&quot;, &quot;description&quot;: &quot;Details&quot;, &quot;price&quot;: 100.0, &quot;discount&quot;: 10.0, &quot;category&quot;: &quot;SHIRTS&quot;, &quot;imagePath&quot;: &quot;image.jpg&quot; }</code></td>
<td>Yes + Admin Role</td>
</tr>
<tr>
<td></td>
<td><code>/product/edit/{id}</code></td>
<td><strong>Edits</strong> product details by ID</td>
<td><code>PUT</code></td>
<td><code>{ &quot;name&quot;: &quot;NewName&quot;, &quot;description&quot;: &quot;UpdatedDetails&quot;, &quot;price&quot;: 120.0, &quot;discount&quot;: 15.0, &quot;imagePath&quot;: &quot;newImage.jpg&quot; }</code></td>
<td>Yes + Admin Role</td>
</tr>
<tr>
<td></td>
<td><code>/product/delete/{id}</code></td>
<td><strong>Deletes</strong> a product by ID</td>
<td><code>DELETE</code></td>
<td>None</td>
<td>Yes + Admin Role</td>
</tr>
<tr>
<td><strong>Address</strong></td>
<td><code>/address</code></td>
<td><strong>Displays</strong> all addresses</td>
<td><code>GET</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/address/{id}</code></td>
<td><strong>Displays</strong> an address by ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/address/add</code></td>
<td><strong>Adds</strong> a new address</td>
<td><code>POST</code></td>
<td><code>{ &quot;street&quot;: &quot;123 Main St&quot;, &quot;city&quot;: &quot;SampleCity&quot;, &quot;zipCode&quot;: &quot;12345&quot;, &quot;category&quot;: &quot;HOME&quot;, &quot;isPrimary&quot;: true }</code></td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/address/edit/{id}</code></td>
<td><strong>Edits</strong> an address by ID</td>
<td><code>PUT</code></td>
<td><code>{ &quot;street&quot;: &quot;NewStreet&quot;, &quot;city&quot;: &quot;NewCity&quot;, &quot;zipCode&quot;: &quot;54321&quot;, &quot;category&quot;: &quot;WORK&quot; &quot;isPrimary&quot;: false }</code></td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/address/delete/{id}</code></td>
<td><strong>Deletes</strong> the user relations to the address</td>
<td><code>DELETE</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td><strong>Size</strong></td>
<td><code>/size</code></td>
<td><strong>Displays</strong> all sizes</td>
<td><code>GET</code></td>
<td>None</td>
<td>No</td>
</tr>
<tr>
<td></td>
<td><code>/size/{id}</code></td>
<td><strong>Displays</strong> a size by ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>No</td>
</tr>
<tr>
<td></td>
<td><code>/size/add</code></td>
<td><strong>Adds</strong> a new size</td>
<td><code>POST</code></td>
<td><code>{ &quot;name&quot;: &quot;XL&quot; }</code></td>
<td>Yes + Admin Role</td>
</tr>
<tr>
<td></td>
<td><code>/size/edit/{id}</code></td>
<td><strong>Edits</strong> a size by ID</td>
<td><code>PUT</code></td>
<td><code>{ &quot;name&quot;: &quot;NewSize&quot; }</code></td>
<td>Yes + Admin Role</td>
</tr>
<tr>
<td></td>
<td><code>/size/delete/{id}</code></td>
<td><strong>Deletes</strong> a size by ID</td>
<td><code>DELETE</code></td>
<td>None</td>
<td>Yes + Admin Role</td>
</tr>
<tr>
<td><strong>Product_Inventory</strong></td>
<td><code>/productInventory</code></td>
<td><strong>Displays</strong> all product inventory</td>
<td><code>GET</code></td>
<td>None</td>
<td>No</td>
</tr>
<tr>
<td></td>
<td><code>/productInventory/{id}</code></td>
<td><strong>Displays</strong> product inventory by ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>No</td>
</tr>
<tr>
<td></td>
<td><code>/productInventory/add</code></td>
<td><strong>Adds</strong> inventory for a product</td>
<td><code>POST</code></td>
<td><code>{ &quot;productID&quot;: 1, &quot;sizeID&quot;: 1, &quot;productQuantity&quot;: 50 }</code></td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/productInventory/edit/{id}</code></td>
<td><strong>Edits</strong> inventory details by ID</td>
<td><code>PUT</code></td>
<td><code>{ &quot;productQuantity&quot;: 60 }</code></td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/productInventory/delete/{id}</code></td>
<td><strong>Deletes</strong> inventory by ID</td>
<td><code>DELETE</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td><strong>Order</strong></td>
<td><code>/order</code></td>
<td><strong>Displays</strong> all orders</td>
<td><code>GET</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/order/{id}</code></td>
<td><strong>Displays</strong> an order by ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/order/add</code></td>
<td><strong>Adds</strong> a new order</td>
<td><code>POST</code></td>
<td><code>{ &quot;userID&quot;: 1, &quot;addressID&quot;: 1, &quot;shippingAmount&quot;: 50.0, &quot;paymentMethod&quot;: &quot;Card&quot; }</code></td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/order/edit/{id}</code></td>
<td><strong>Edits</strong> an order by ID</td>
<td><code>PUT</code></td>
<td><code>{ &quot;addressID&quot;: 2, &quot;shippingAmount&quot;: 50.0, &quot;status&quot;: &quot;Shipped&quot;, &quot;paymentMethod&quot;: &quot;Cash&quot;, &quot;dateArrived&quot;: &quot;2024-12-01T12:00:00Z&quot; }</code></td>
<td>Yes + Admin Role</td>
</tr>
<tr>
<td></td>
<td><code>/order/delete/{id}</code></td>
<td><strong>Deletes</strong> an order by ID</td>
<td><code>DELETE</code></td>
<td>None</td>
<td>Yes + Admin Role</td>
</tr>
<tr>
<td><strong>Order_Item</strong></td>
<td><code>/orderItem/{id}</code></td>
<td><strong>Displays</strong> order items by ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/orderItem/invID/{id}</code></td>
<td><strong>Displays</strong> order items by inventory ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/orderItem/ordID/{id}</code></td>
<td><strong>Displays</strong> order items by order ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/orderItem/add</code></td>
<td><strong>Adds</strong> an item to an order</td>
<td><code>POST</code></td>
<td><code>{ &quot;orderID&quot;: 1, &quot;inventoryID&quot;: 1, &quot;quantity&quot;: 2, &quot;priceAtPurchase&quot;: 100.0 }</code></td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/orderItem/edit/{id}</code></td>
<td><strong>Edits</strong> an order item by ID</td>
<td><code>PUT</code></td>
<td><code>{ &quot;quantity&quot;: 3, &quot;priceAtPurchase&quot;: 50.0 }</code></td>
<td>Yes + Admin Role</td>
</tr>
<tr>
<td></td>
<td><code>/orderItem/delete/{id}</code></td>
<td><strong>Deletes</strong> an order item by ID</td>
<td><code>DELETE</code></td>
<td>None</td>
<td>Yes + Admin Role</td>
</tr>
<tr>
<td><strong>Shopping_Cart</strong></td>
<td><code>/shoppingCart/add</code></td>
<td><strong>Initializes</strong> a shopping cart</td>
<td><code>POST</code></td>
<td><code>{ &quot;userID&quot;: 1 }</code></td>
<td>Yes</td>
</tr>
<tr>
<td><strong>Cart_Item</strong></td>
<td><code>/cartItem/{id}</code></td>
<td><strong>Displays</strong> cart items by ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/cartItem/invID/{id}</code></td>
<td><strong>Displays</strong> cart items by inventory ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/cartItem/add</code></td>
<td><strong>Adds</strong> an item to a cart</td>
<td><code>POST</code></td>
<td><code>{ &quot;cartID&quot;: 1, &quot;inventoryID&quot;: 1, &quot;quantity&quot;: 2 }</code></td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/cartItem/edit/{id}</code></td>
<td><strong>Edits</strong> a cart item by ID</td>
<td><code>PUT</code></td>
<td><code>{ &quot;quantity&quot;: 3 }</code></td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/cartItem/delete/{id}</code></td>
<td><strong>Deletes</strong> a cart item by ID</td>
<td><code>DELETE</code></td>
<td>None</td>
<td>Yes</td>
</tr>
<tr>
<td><strong>Product_Review</strong></td>
<td><code>/productReview/{id}</code></td>
<td><strong>Displays</strong> a product review by ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>No</td>
</tr>
<tr>
<td></td>
<td><code>/productReview/userID/{id}</code></td>
<td><strong>Displays</strong> product reviews by user ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>No</td>
</tr>
<tr>
<td></td>
<td><code>/productReview/productID/{id}</code></td>
<td><strong>Displays</strong> product reviews by product ID</td>
<td><code>GET</code></td>
<td>None</td>
<td>No</td>
</tr>
<tr>
<td></td>
<td><code>/productReview/add</code></td>
<td><strong>Adds</strong> a product review</td>
<td><code>POST</code></td>
<td><code>{ &quot;userID&quot;: 1, &quot;productID&quot;: 1, &quot;title&quot;: &quot;Review Title&quot;, &quot;description&quot;: &quot;Great product!&quot;, &quot;rating&quot;: 5 }</code></td>
<td>Yes</td>
</tr>
<tr>
<td></td>
<td><code>/productReview/delete/{id}</code></td>
<td><strong>Deletes</strong> a product review by ID</td>
<td><code>DELETE</code></td>
<td>None</td>
<td>Yes + Admin Role</td>
</tr>
</tbody>
</table>


---

## Possible Concerns

- No handling for email, password, and any other attributes in the database (e.g. password length, email validation, phone number).
- No data for account creation date

---

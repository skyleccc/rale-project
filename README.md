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

<style>
  table {
    width: 100%;
    table-layout: fixed; /* Distributes columns evenly */
    border-collapse: collapse; /* Ensures no extra space between borders */
    font-size: 12px; /* Adjust font size for smaller content */
  }

  th, td {
    padding: 5px; /* Reduces the padding to make the cells more compact */
    text-align: left; /* Ensures text is left-aligned */
    border: 1px solid #ddd; /* Adds a light border for better visibility */
  }

  th {
    background-color: #f4f4f4; /* Light gray background for headers */
    font-weight: bold;
  }
</style>

<div style="overflow-x: auto">
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
        <td><code>{ "email": "user@mail.com", "username": "user", "password": "pass", "phoneNumber": "number", "userFirstName": "John", "userLastName": "Doe" }</code></td>
        <td>No</td>
      </tr>
      <tr>
        <td></td>
        <td><code>/user/login</code></td>
        <td><strong>Logs in</strong> a user</td>
        <td><code>POST</code></td>
        <td><code>{ "email": "user@mail.com", "password": "pass" }</code></td>
        <td>No</td>
      </tr>
      <tr>
        <td></td>
        <td><code>/user/editDetails/{id}</code></td>
        <td><strong>Edits</strong> user details by ID</td>
        <td><code>PUT</code></td>
        <td><code>{ "email": "newemail@mail.com", "phoneNumber": "newnumber", "userFirstName": "NewFirstName", "userLastName": "NewLastName" }</code></td>
        <td>Yes</td>
      </tr>
      <tr>
        <td></td>
        <td><code>/user/editPassword/{id}</code></td>
        <td><strong>Edits</strong> user password by ID</td>
        <td><code>PUT</code></td>
        <td><code>{ "password": "newpassword" }</code></td>
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
        <td><code>{ "name": "ProductName", "description": "Details", "price": 100.0, "discount": 10.0, "category": "SHIRTS", "imagePath": "image.jpg" }</code></td>
        <td>Yes + Admin Role</td>
      </tr>
      <tr>
        <td></td>
        <td><code>/product/edit/{id}</code></td>
        <td><strong>Edits</strong> product details by ID</td>
        <td><code>PUT</code></td>
        <td><code>{ "name": "NewName", "description": "UpdatedDetails", "price": 120.0, "discount": 15.0, "imagePath": "newImage.jpg" }</code></td>
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
        <td><code>{ "street": "123 Main St", "city": "SampleCity", "zipCode": "12345", "category": "HOME", "isPrimary": true }</code></td>
        <td>Yes</td>
      </tr>
      <tr>
        <td></td>
        <td><code>/address/edit/{id}</code></td>
        <td><strong>Edits</strong> an address by ID</td>
        <td><code>PUT</code></td>
        <td><code>{ "street": "NewStreet", "city": "NewCity", "zipCode": "54321", "category": "WORK", "isPrimary": false }</code></td>
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
        <td><code>{ "name": "XL" }</code></td>
        <td>Yes + Admin Role</td>
      </tr>
      <tr>
        <td></td>
        <td><code>/size/edit/{id}</code></td>
        <td><strong>Edits</strong> a size by ID</td>
        <td><code>PUT</code></td>
        <td><code>{ "name": "NewSize" }</code></td>
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
        <td><strong>Adds</strong> a new product inventory</td>
        <td><code>POST</code></td>
        <td><code>{ "productId": "123", "sizeId": "2", "stock": 100 }</code></td>
        <td>Yes + Admin Role</td>
      </tr>
      <tr>
        <td></td>
        <td><code>/productInventory/edit/{id}</code></td>
        <td><strong>Edits</strong> product inventory by ID</td>
        <td><code>PUT</code></td>
        <td><code>{ "stock": 150 }</code></td>
        <td>Yes + Admin Role</td>
      </tr>
      <tr>
        <td></td>
        <td><code>/productInventory/delete/{id}</code></td>
        <td><strong>Deletes</strong> product inventory by ID</td>
        <td><code>DELETE</code></td>
        <td>None</td>
        <td>Yes + Admin Role</td>
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
        <td><strong>Displays</strong> order details by ID</td>
        <td><code>GET</code></td>
        <td>None</td>
        <td>Yes</td>
      </tr>
      <tr>
        <td></td>
        <td><code>/order/add</code></td>
        <td><strong>Adds</strong> a new order</td>
        <td><code>POST</code></td>
        <td><code>{ "userId": "1", "orderDate": "2024-11-29", "totalAmount": 150.0, "shippingAddress": "AddressID" }</code></td>
        <td>Yes</td>
      </tr>
      <tr>
        <td></td>
        <td><code>/order/edit/{id}</code></td>
        <td><strong>Edits</strong> an order by ID</td>
        <td><code>PUT</code></td>
        <td><code>{ "totalAmount": 160.0 }</code></td>
        <td>Yes</td>
      </tr>
      <tr>
        <td></td>
        <td><code>/order/delete/{id}</code></td>
        <td><strong>Deletes</strong> an order by ID</td>
        <td><code>DELETE</code></td>
        <td>None</td>
        <td>Yes</td>
      </tr>
    </tbody>
  </table>
</div>




---

## Possible Concerns

- No handling for email, password, and any other attributes in the database (e.g. password length, email validation, phone number).
- No data for account creation date

---

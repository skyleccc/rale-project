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

| **Table**           | **Route/s**                     | **Operation/s**                                           | **Request Header Type** | **Request Body**                                          | **JWT Authentication**        |
|----------------------|---------------------------------|----------------------------------------------------------|--------------------------|-----------------------------------------------------------|----------------------------|
| **User**            | `/user/{id}`                   | **Displays** user details by ID                          | `GET`                   | None                                                      | Yes                        |
|                     | `/user/register`               | **Registers** a new user                                 | `POST`                  | `{ "email": "user@mail.com", "username": "user", "password": "pass", "phoneNumber": "number", "userFirstName": "John", "userLastName": "Doe" }` | No |
|                     | `/user/login`                  | **Logs in** a user                                       | `POST`                  | `{ "email": "user@mail.com", "password": "pass" }`        | No |
|                     | `/user/editDetails/{id}`       | **Edits** user details by ID                             | `PUT`                   | `{ "email": "newemail@mail.com", "phoneNumber": "newnumber", "userFirstName": "NewFirstName", "userLastName": "NewLastName" }` | Yes |
|                     | `/user/editPassword/{id}`      | **Edits** user password by ID                            | `PUT`                   | `{ "password": "newpassword" }`                           | Yes |
| **Product**         | `/product`                     | **Displays** all products                                | `GET`                   | None                                                      | No |
|                     | `/product/{id}`                | **Displays** a product by ID                             | `GET`                   | None                                                      | No |
|                     | `/product/add`                 | **Adds** a new product                                   | `POST`                  | `{ "name": "ProductName", "description": "Details", "price": 100.0, "discount": 10.0, "category": "SHIRTS", "imagePath": "image.jpg" }` | Yes + Admin Role |
|                     | `/product/edit/{id}`           | **Edits** product details by ID                          | `PUT`                   | `{ "name": "NewName", "description": "UpdatedDetails", "price": 120.0, "discount": 15.0, "imagePath": "newImage.jpg" }` | Yes + Admin Role |
|                     | `/product/delete/{id}`         | **Deletes** a product by ID                              | `DELETE`                | None                                                      | Yes + Admin Role |
| **Address**         | `/address`                     | **Displays** all addresses                               | `GET`                   | None                                                      | Yes |
|                     | `/address/{id}`                | **Displays** an address by ID                            | `GET`                   | None                                                      | Yes |
|                     | `/address/add`                 | **Adds** a new address                                   | `POST`                  | `{ "street": "123 Main St", "city": "SampleCity", "zipCode": "12345", "category": "HOME", "isPrimary": true }` | Yes |
|                     | `/address/edit/{id}`           | **Edits** an address by ID                               | `PUT`                   | `{ "street": "NewStreet", "city": "NewCity", "zipCode": "54321", "category": "WORK" "isPrimary": false }` | Yes |
|                     | `/address/delete/{id}`         | **Deletes** the user relations to the address            | `DELETE`                | None                                                      | Yes |
| **Size**            | `/size`                        | **Displays** all sizes                                   | `GET`                   | None                                                      | No |
|                     | `/size/{id}`                   | **Displays** a size by ID                                | `GET`                   | None                                                      | No |
|                     | `/size/add`                    | **Adds** a new size                                      | `POST`                  | `{ "name": "XL" }`                                        | Yes + Admin Role |
|                     | `/size/edit/{id}`              | **Edits** a size by ID                                   | `PUT`                   | `{ "name": "NewSize" }`                                   | Yes + Admin Role |
|                     | `/size/delete/{id}`            | **Deletes** a size by ID                                 | `DELETE`                | None                                                      | Yes + Admin Role |
| **Product_Inventory**| `/productInventory`            | **Displays** all product inventory                      | `GET`                   | None                                                      | No |
|                     | `/productInventory/{id}`       | **Displays** product inventory by ID                    | `GET`                   | None                                                      | No |
|                     | `/productInventory/add`        | **Adds** inventory for a product                        | `POST`                  | `{ "productID": 1, "sizeID": 1, "productQuantity": 50 }`  | Yes |
|                     | `/productInventory/edit/{id}`  | **Edits** inventory details by ID                       | `PUT`                   | `{ "productQuantity": 60 }`                               | Yes |
|                     | `/productInventory/delete/{id}`| **Deletes** inventory by ID                             | `DELETE`                | None                                                      | Yes |
| **Order**           | `/order`                       | **Displays** all orders                                 | `GET`                   | None                                                      | Yes |
|                     | `/order/{id}`                  | **Displays** an order by ID                             | `GET`                   | None                                                      | Yes |
|                     | `/order/add`                   | **Adds** a new order                                    | `POST`                  | `{ "userID": 1, "addressID": 1, "shippingAmount": 50.0, "paymentMethod": "Card" }` | Yes |
|                     | `/order/edit/{id}`             | **Edits** an order by ID                                | `PUT`                   | `{ "addressID": 2, "shippingAmount": 50.0, "status": "Shipped", "paymentMethod": "Cash", "dateArrived": "2024-12-01T12:00:00Z" }` | Yes + Admin Role |
|                     | `/order/delete/{id}`           | **Deletes** an order by ID                              | `DELETE`                | None                                                      | Yes + Admin Role |
| **Order_Item**      | `/orderItem/{id}`              | **Displays** order items by ID                          | `GET`                   | None                                                      | Yes |
|                     | `/orderItem/invID/{id}`        | **Displays** order items by inventory ID                | `GET`                   | None                                                      | Yes |
|                     | `/orderItem/ordID/{id}`        | **Displays** order items by order ID                    | `GET`                   | None                                                      | Yes |
|                     | `/orderItem/add`               | **Adds** an item to an order                            | `POST`                  | `{ "orderID": 1, "inventoryID": 1, "quantity": 2, "priceAtPurchase": 100.0 }` | Yes |
|                     | `/orderItem/edit/{id}`         | **Edits** an order item by ID                           | `PUT`                   | `{ "quantity": 3, "priceAtPurchase": 50.0 }`              | Yes + Admin Role |
|                     | `/orderItem/delete/{id}`       | **Deletes** an order item by ID                         | `DELETE`                | None                                                      | Yes + Admin Role |
| **Shopping_Cart**   | `/shoppingCart/add`            | **Initializes** a shopping cart                        | `POST`                  | `{ "userID": 1 }`                                         | Yes |
| **Cart_Item**       | `/cartItem/{id}`               | **Displays** cart items by ID                           | `GET`                   | None                                                      | Yes |
|                     | `/cartItem/invID/{id}`         | **Displays** cart items by inventory ID                 | `GET`                   | None                                                      | Yes |
|                     | `/cartItem/add`                | **Adds** an item to a cart                              | `POST`                  | `{ "cartID": 1, "inventoryID": 1, "quantity": 2 }`        | Yes |
|                     | `/cartItem/edit/{id}`          | **Edits** a cart item by ID                             | `PUT`                   | `{ "quantity": 3 }`                                       | Yes |
|                     | `/cartItem/delete/{id}`        | **Deletes** a cart item by ID                           | `DELETE`                | None                                                      | Yes |
| **Product_Review**  | `/productReview/{id}`          | **Displays** a product review by ID                     | `GET`                   | None                                                      | No |
|                     | `/productReview/userID/{id}`   | **Displays** product reviews by user ID                | `GET`                   | None                                                      | No |
|                     | `/productReview/productID/{id}`| **Displays** product reviews by product ID             | `GET`                   | None                                                      | No |
|                     | `/productReview/add`           | **Adds** a product review                              | `POST`                  | `{ "userID": 1, "productID": 1, "title": "Review Title", "description": "Great product!", "rating": 5 }` | Yes |
|                     | `/productReview/delete/{id}`   | **Deletes** a product review by ID                     | `DELETE`                | None                                                      | Yes + Admin Role |

---

## Possible Concerns

- No handling for email, password, and any other attributes in the database (e.g. password length, email validation, phone number).
- No data for account creation date

---

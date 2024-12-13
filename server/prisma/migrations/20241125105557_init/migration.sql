-- CreateEnum
CREATE TYPE "user_Role" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "prod_Category" AS ENUM ('NONE', 'SHIRTS', 'PANTS', 'ACCESSORIES', 'UNDERWEARS', 'HATS');

-- CreateEnum
CREATE TYPE "addr_Category" AS ENUM ('HOME', 'OFFICE');

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" "user_Role" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Product_Review" (
    "reviewID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "productID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_Review_pkey" PRIMARY KEY ("reviewID")
);

-- CreateTable
CREATE TABLE "Product" (
    "productID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "releasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "prod_Category" NOT NULL DEFAULT 'NONE',
    "imagePath" TEXT NOT NULL DEFAULT 'def.jpg',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productID")
);

-- CreateTable
CREATE TABLE "Product_Inventory" (
    "inventoryID" SERIAL NOT NULL,
    "productID" INTEGER NOT NULL,
    "sizeID" INTEGER NOT NULL,
    "productQuantity" INTEGER NOT NULL,

    CONSTRAINT "Product_Inventory_pkey" PRIMARY KEY ("inventoryID")
);

-- CreateTable
CREATE TABLE "Size" (
    "sizeID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("sizeID")
);

-- CreateTable
CREATE TABLE "Address" (
    "addressID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "category" "addr_Category" NOT NULL DEFAULT 'HOME',
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressID")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "shippingAmount" DECIMAL(65,30) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "addressID" INTEGER NOT NULL,
    "dateOrdered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "dateArrived" TIMESTAMP(3),
    "paymentMethod" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderID")
);

-- CreateTable
CREATE TABLE "Order_Item" (
    "itemID" SERIAL NOT NULL,
    "orderID" INTEGER NOT NULL,
    "inventoryID" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceAtPurchase" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Order_Item_pkey" PRIMARY KEY ("itemID")
);

-- CreateTable
CREATE TABLE "Shopping_Cart" (
    "cartID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shopping_Cart_pkey" PRIMARY KEY ("cartID")
);

-- CreateTable
CREATE TABLE "Cart_Item" (
    "itemID" SERIAL NOT NULL,
    "cartID" INTEGER NOT NULL,
    "inventoryID" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_Item_pkey" PRIMARY KEY ("itemID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Product_Review" ADD CONSTRAINT "Product_Review_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Review" ADD CONSTRAINT "Product_Review_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("productID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Inventory" ADD CONSTRAINT "Product_Inventory_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("productID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Inventory" ADD CONSTRAINT "Product_Inventory_sizeID_fkey" FOREIGN KEY ("sizeID") REFERENCES "Size"("sizeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "Address"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Item" ADD CONSTRAINT "Order_Item_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("orderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Item" ADD CONSTRAINT "Order_Item_inventoryID_fkey" FOREIGN KEY ("inventoryID") REFERENCES "Product_Inventory"("inventoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shopping_Cart" ADD CONSTRAINT "Shopping_Cart_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "Cart_Item_cartID_fkey" FOREIGN KEY ("cartID") REFERENCES "Shopping_Cart"("cartID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "Cart_Item_inventoryID_fkey" FOREIGN KEY ("inventoryID") REFERENCES "Product_Inventory"("inventoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

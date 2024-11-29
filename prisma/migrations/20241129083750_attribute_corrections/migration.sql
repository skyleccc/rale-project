-- DropForeignKey
ALTER TABLE "Cart_Item" DROP CONSTRAINT "Cart_Item_cartID_fkey";

-- DropForeignKey
ALTER TABLE "Cart_Item" DROP CONSTRAINT "Cart_Item_inventoryID_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userID_fkey";

-- DropForeignKey
ALTER TABLE "Order_Item" DROP CONSTRAINT "Order_Item_orderID_fkey";

-- DropForeignKey
ALTER TABLE "Product_Review" DROP CONSTRAINT "Product_Review_productID_fkey";

-- DropForeignKey
ALTER TABLE "Product_Review" DROP CONSTRAINT "Product_Review_userID_fkey";

-- DropForeignKey
ALTER TABLE "Shopping_Cart" DROP CONSTRAINT "Shopping_Cart_userID_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "userID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product_Review" ALTER COLUMN "userID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product_Review" ADD CONSTRAINT "Product_Review_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Review" ADD CONSTRAINT "Product_Review_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("productID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Item" ADD CONSTRAINT "Order_Item_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("orderID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shopping_Cart" ADD CONSTRAINT "Shopping_Cart_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "Cart_Item_cartID_fkey" FOREIGN KEY ("cartID") REFERENCES "Shopping_Cart"("cartID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "Cart_Item_inventoryID_fkey" FOREIGN KEY ("inventoryID") REFERENCES "Product_Inventory"("inventoryID") ON DELETE CASCADE ON UPDATE CASCADE;

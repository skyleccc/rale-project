-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userID_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "userID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

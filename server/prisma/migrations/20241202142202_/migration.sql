/*
  Warnings:

  - The values [SHIRTS,PANTS,ACCESSORIES,UNDERWEARS,HATS] on the enum `prod_Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "prod_Category_new" AS ENUM ('NONE', 'BASICS', 'GRAPHICTEES', 'OVERSIZED');
ALTER TABLE "Product" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "prod_Category_new" USING ("category"::text::"prod_Category_new");
ALTER TYPE "prod_Category" RENAME TO "prod_Category_old";
ALTER TYPE "prod_Category_new" RENAME TO "prod_Category";
DROP TYPE "prod_Category_old";
ALTER TABLE "Product" ALTER COLUMN "category" SET DEFAULT 'NONE';
COMMIT;

/*
  Warnings:

  - You are about to drop the column `message` on the `Enquiry` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Enquiry` table. All the data in the column will be lost.
  - Added the required column `additional_info` to the `Enquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_date` to the `Enquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_type` to the `Enquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Enquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Enquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_event_type` to the `Enquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Enquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposed_payment` to the `Enquiry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Enquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "event_type" TEXT NOT NULL,
    "event_date" DATETIME NOT NULL,
    "other_event_type" TEXT NOT NULL,
    "proposed_payment" TEXT NOT NULL,
    "additional_info" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Enquiry" ("createdAt", "email", "id", "updatedAt") SELECT "createdAt", "email", "id", "updatedAt" FROM "Enquiry";
DROP TABLE "Enquiry";
ALTER TABLE "new_Enquiry" RENAME TO "Enquiry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

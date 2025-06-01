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
    "other_event_type" TEXT,
    "proposed_payment" TEXT NOT NULL,
    "additional_info" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Enquiry" ("additional_info", "createdAt", "email", "event_date", "event_type", "first_name", "id", "last_name", "other_event_type", "phone_number", "proposed_payment", "updatedAt") SELECT "additional_info", "createdAt", "email", "event_date", "event_type", "first_name", "id", "last_name", "other_event_type", "phone_number", "proposed_payment", "updatedAt" FROM "Enquiry";
DROP TABLE "Enquiry";
ALTER TABLE "new_Enquiry" RENAME TO "Enquiry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

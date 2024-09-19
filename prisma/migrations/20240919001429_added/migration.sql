-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "item_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "item_name" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "priority" TEXT NOT NULL DEFAULT 'Baixa',
    "list_id" INTEGER NOT NULL,
    CONSTRAINT "Item_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "List" ("list_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("created_at", "edited_at", "finished", "item_id", "item_name", "list_id", "priority") SELECT "created_at", "edited_at", "finished", "item_id", "item_name", "list_id", "priority" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

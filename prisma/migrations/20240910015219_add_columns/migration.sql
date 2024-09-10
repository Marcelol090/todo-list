-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_List" (
    "list_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "list_name" TEXT NOT NULL,
    "listEmoji" TEXT NOT NULL DEFAULT '😎',
    "priority" TEXT NOT NULL DEFAULT 'Baixa',
    "user_id" INTEGER NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "List_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_List" ("list_id", "list_name", "priority", "user_id") SELECT "list_id", "list_name", "priority", "user_id" FROM "List";
DROP TABLE "List";
ALTER TABLE "new_List" RENAME TO "List";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

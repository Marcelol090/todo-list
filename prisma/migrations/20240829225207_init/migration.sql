-- CreateTable
CREATE TABLE "User" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "List" (
    "list_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "list_name" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'Baixa',
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "List_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "item_name" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "priority" TEXT NOT NULL DEFAULT 'Baixa',
    "list_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

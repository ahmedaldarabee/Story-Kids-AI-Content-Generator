import { json } from "drizzle-orm/gel-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

export const storyTable = pgTable("stories",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    storyId: varchar().notNull().unique(),
    storySubject: varchar(),
    storyType:varchar(),
    ageGroup: varchar(),
    
    // this section about content generation by AI
    content:json(),

    // references - this email that be as foreign form users table
    email:varchar('email').references(() => usersTable.email),
})
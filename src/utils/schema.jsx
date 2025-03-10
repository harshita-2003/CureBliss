import { sql } from "drizzle-orm";
import { integer,varchar,pgTable,serial,text } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id : serial('id').primaryKey(),
    username : varchar('username').unique(),
    age : integer('age').notNull(),
    location : text('location').notNull(),
    created_by : varchar('created_by').notNull(),
})

export const Records = pgTable('records', {
    id : serial('id').primaryKey(),
    userId : integer('user_id').references(() => Users.id).notNull(),
    record : text('record').notNull(),
    analysisResult : varchar('analysis_result').notNull(),
    kanbanRecords : varchar('kanban_records').notNull(),
    created_by : varchar('created_by').notNull(),
})
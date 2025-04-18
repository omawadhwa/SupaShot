import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Screenshot model
export const screenshots = pgTable("screenshots", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  settings: jsonb("settings").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertScreenshotSchema = createInsertSchema(screenshots)
  .omit({ id: true })
  .pick({
    userId: true,
    name: true,
    imageUrl: true,
    settings: true,
    createdAt: true,
  });

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertScreenshot = z.infer<typeof insertScreenshotSchema>;
export type Screenshot = typeof screenshots.$inferSelect;

// EditorSettings type
export type EditorSettings = {
  frameType: string;
  background: {
    type: 'transparent' | 'solid' | 'gradient' | 'image';
    value: string;
  };
  border: {
    width: number;
    color: string;
    radius: number;
  };
  shadow: {
    enabled: boolean;
    color: string;
    intensity: number;
    position: {
      x: number;
      y: number;
      blur: number;
      spread: number;
    };
  };
  effects: {
    type: string;
    value: any;
  }[];
};

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    author: v.string(),
    body: v.string(),
  }),
  input01: defineTable({
    dietaryRestriction: v.string(),
    calories: v.int64(),
    price: v.int64(),
  })
});

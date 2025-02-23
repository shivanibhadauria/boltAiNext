import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  }),

  workspace: defineTable({
    messages: v.array(
      v.object({
        content: v.string(), // Fixed typo from "contant" to "content"
        role: v.string(),
      })
    ),
    fileData: v.optional(v.any()),
    users: v.array(v.id("users")), // Allow multiple users instead of an optional single user
  }),
});

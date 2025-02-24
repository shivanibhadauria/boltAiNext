import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createWorkSpace = mutation({
  args: v.object({
    messages: v.any(),
    users: v.array(v.id("users")),
  }),
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      messages: args.messages,
      users: args.users,
    });
    return workspaceId;
  },
});

export const Getworkspace = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.workspaceId);
    return result;
  },
});

export const updateMessage = mutation({
  args: {
    workspaceId: v.id("workspace"),
    messages: v.any(),
  },

  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });
    return result;
  },
});

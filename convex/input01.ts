import { internal } from "./_generated/api";
import { internalMutation, mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { v } from "convex/values";

export const sendUserInput01 = mutation({
    
    args: { dietaryRestriction: v.string(), calories: v.string(), price: v.string() },
    handler: async (ctx, {dietaryRestriction, calories, price}) => {
        
      await ctx.db.insert("input01", {dietaryRestriction, calories, price});
    },
  });

  export const list = query({
    handler: async (ctx): Promise<Doc<"messages">[]> => {
      // Grab the most recent messages.
      const messages = await ctx.db.query("messages").order("desc").take(100);
      // Reverse the list so that it's in chronological order.
      return messages.reverse();
    },
  });
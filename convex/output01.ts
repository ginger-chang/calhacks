import { internal } from "./_generated/api";
import { internalMutation, mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { v } from "convex/values";

export const recordOutput = mutation({
    
    args: { output: v.string() },
    handler: async (ctx, {output}) => {
    const lines = output.split("\n");
    const name = lines[2].substring(6, lines[2].length);
    const calories = lines[3].substring(10, lines[3].length);
    const price = lines[4].substring(7, lines[4].length);
    const description = lines[5].substring(13, lines[5].length);
    await ctx.db.insert("output01", {name, calories, price, description});

    //   await ctx.db.insert("input01", {dietaryRestriction, calories, price});
    //   const message = "What I don't eat: " + dietaryRestriction + ", and my budget is "
    //    + price + ", please give me a suggestion of a meal that is under " + calories + 
    //    " calories in the format of Name | Calories | Price."
    //    console.log("before running chat in input01.ts");
    //   ctx.scheduler.runAfter(0, internal.openai.chat, {message});
    //   console.log("after running chat in input01.ts");
    },
});

export const list = query({
    handler: async (ctx): Promise<Doc<"output01">[]> => {
      // Grab the most recent messages.
      const meals = await ctx.db.query("output01").order("desc").take(1);
      // Reverse the list so that it's in chronological order.
      return meals.reverse();
    },
  });



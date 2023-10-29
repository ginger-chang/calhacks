import { internal } from "./_generated/api";
import { internalMutation, mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { v } from "convex/values";

export const clearMenu = mutation({
    handler: async(ctx) => {
      console.log("clearMenu is called");
    var meal = await ctx.db.query("output01").first();
    while(meal) {
      await ctx.db.delete(meal._id);
      meal = await ctx.db.query("output01").first();
    }
  }
});

export const recordOutput = mutation({
    
    args: { output: v.string() },
    handler: async (ctx, {output}) => {
    const lines = output.split("\n");
    var name = "";
    var calories = "";
    var price = "";
    var description = "";
    var k;
    for(var i = 0; i < lines.length - 1; i ++) {
      if (lines[i].indexOf("Name: ") != -1) {
        k = lines[i].indexOf("Name: ");
        name = lines[i].substring(6 + k, lines[i].length);
      }
      if (lines[i].indexOf("Calories: ") != -1) {
        k = lines[i].indexOf("Calories: ");
        name = lines[i].substring(10 + k, lines[i].length);
      }
      if (lines[i].indexOf("Price: ") != -1) {
        k = lines[i].indexOf("Price: ");
        name = lines[i].substring(7 + k, lines[i].length);
      }
      if (lines[i].indexOf("Description: ") != -1) {
        k = lines[i].indexOf("Description: ");
        name = lines[i].substring(13 + k, lines[i].length);
      }
    }
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
      const meals = await ctx.db.query("output01").order("desc").collect();
      // Reverse the list so that it's in chronological order.
      return meals.reverse();
    },
  });



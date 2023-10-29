import { internal } from "./_generated/api";
import { internalMutation, mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { v } from "convex/values";

export const recordOutput = mutation({
    
    args: { output: v.string() },
    handler: async (ctx, {output}) => {
    console.log("before record output in output01");
    await ctx.db.insert("output01", {output});
    console.log("after record output in output01");
    //   await ctx.db.insert("input01", {dietaryRestriction, calories, price});
    //   const message = "What I don't eat: " + dietaryRestriction + ", and my budget is "
    //    + price + ", please give me a suggestion of a meal that is under " + calories + 
    //    " calories in the format of Name | Calories | Price."
    //    console.log("before running chat in input01.ts");
    //   ctx.scheduler.runAfter(0, internal.openai.chat, {message});
    //   console.log("after running chat in input01.ts");
    },
});
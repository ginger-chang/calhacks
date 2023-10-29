import { internal } from "./_generated/api";
import { internalMutation, mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { useMutation, useQuery, useAction } from "convex/react";
import { Doc, Id } from "./_generated/dataModel";
import { v } from "convex/values";
import { api } from "../convex/_generated/api";

// const chat = useAction(api.openai.chat);

export const sendUserInput01 = mutation({
    
    args: { dietaryRestriction: v.string(), calories: v.string(), price: v.string() },
    handler: async (ctx, {dietaryRestriction, calories, price}) => {
        
      await ctx.db.insert("input01", {dietaryRestriction, calories, price});
      const message = "What I don't eat: " + dietaryRestriction + ", and my budget is "
       + price + ", please give me a suggestion of a meal that is under " + calories + 
       " calories in the format of Name | Calories | Price."
       console.log("before running chat in input01.ts");
      // await chat({message});
      ctx.scheduler.runAfter(0, internal.openai.chat, { message });
      console.log("after running chat in input01.ts");
      //return response;

// Name | Calories | Price 


      /*
      if (body.indexOf("@gpt") !== -1) {
      // Fetch the latest n messages to send as context.
      // The default order is by creation time.
      const messages = await ctx.db.query("messages").order("desc").take(10);
      // Reverse the list so that it's in chronological order.
      messages.reverse();
      // Insert a message with a placeholder body.
      const messageId = await ctx.db.insert("messages", {
        author: "ChatGPT",
        body: "...",
      });
      // Schedule an action that calls ChatGPT and updates the message.
      ctx.scheduler.runAfter(0, internal.openai.chat, { messages, messageId });
    }
      */
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
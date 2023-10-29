import { OpenAI } from "openai";
import { internalAction, action } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { v } from "convex/values";

import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { internalMutation, mutation } from "./_generated/server";
import { query } from "./_generated/server";


type ChatParams = {
  messages: Doc<"messages">[];
  messageId: Id<"messages">;
};

//const recordOutput = useMutation(api.output01.recordOutput);

export const chat = internalAction({

  args: {
    message: v.string(),
  },

  handler: async (ctx, args) => {
    console.log("called handler :)");
    const apiKey = process.env.OPENAI_API_KEY!;
    const openai = new OpenAI({ apiKey });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          // Provide a 'system' message to give GPT context about how to respond
          role: "assistant",
          content:
            "You are a nutritionist who will give users meal suggestions based on their dietary restrictions, calories restrictions, and financial restrictions.",
        },
        {
          // Pass on the chat user's message to GPT
          role: "user",
          content: args.message,
          
        },
      ],
    });

    // Pull the message content out of the response
    console.log("asked");
    var output = response.choices[0].message?.content;
    //ctx.db.insert("output01", {responseContent});
    //await ctx.runMutation(api.output01.writeData, {responseContent});
    if (output === null) {
      output = "";
    }
    await ctx.runMutation(api.output01.recordOutput, {
      output: output
    });
  },
  
  /**
   * handler: async (ctx, { messages, messageId }: ChatParams) => {
    const apiKey = process.env.OPENAI_API_KEY!;
    const openai = new OpenAI({ apiKey });

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // "gpt-4" also works, but is so slow!
        stream: true,
        messages: [
          {
            role: "system",
            content: "You are a terse bot in a group chat responding to q's.",
          },
          ...messages.map(({ body, author }) => ({
            role:
              author === "ChatGPT" ? ("assistant" as const) : ("user" as const),
            content: body,
          })),
        ],
      });
      let body = "";
      for await (const part of stream) {
        if (part.choices[0].delta?.content) {
          body += part.choices[0].delta.content;
          // Alternatively you could wait for complete words / sentences.
          // Here we send an update on every stream message.
          await ctx.runMutation(internal.messages.update, {
            messageId,
            body,
          });
        }
      }
    } catch (e) {
      if (e instanceof OpenAI.APIError) {
        console.error(e.status);
        console.error(e.message);
        await ctx.runMutation(internal.messages.update, {
          messageId,
          body: "OpenAI call failed: " + e.message,
        });
        console.error(e);
      } else {
        throw e;
      }
    }
  },
   */
});

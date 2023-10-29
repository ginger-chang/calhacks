import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { faker } from "@faker-js/faker";
import { Button } from "../src/components/ui/button";
import { Input } from "../src/components/ui/input"
import { Checkbox } from "../src/components/ui/checkbox"
import { Label } from "../src/components/ui/label"



// For demo purposes. In a real app, you'd have real user data.
const NAME = faker.person.firstName();

export default function App() {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);
  const sendUserInput = useMutation(api.input01.sendUserInput01);
  const answer = useQuery(api.output01.list);
  const [newMessageText, setNewMessageText] = useState("");
  const [rememberMyPreferences, setRememberMyPreferences] = useState(false)


  const [newIdea, setNewIdea] = useState("")
  const [newCalories, setNewCalories] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [menuCreate, setMenuCreate] = useState(false);
  //const [includeRandom, setIncludeRandom] = useState(true)

  // const ideas = useQuery(api.myFunctions.listIdeas)
  // const saveIdea = useMutation(api.myFunctions.saveIdea)
  // const generateIdea = useAction(api.myFunctions.fetchRandomIdea)

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [messages]);


  const showMenu = () => {
    console.log("show menu");
    return (
      <ul>
          {answer?.map((document, i) => (
            <li key={i}>
              {document.name}
              {document.calories}
              {document.price}
              {document.description}
            </li>
          ))}
      </ul>
    )
  }

  
  return (
    // chat
    <main className="container max-w-2xl flex flex-col gap-8">
        <div className="flex gap-2">
          <Input
            type="text"
            value={newIdea}
            onChange={(event) => setNewIdea(event.target.value)}
            placeholder="What can't you eat?"
          />
          <Input
            type="number"
            value={newCalories}
            onChange={(event) => setNewCalories(event.target.value)}
            placeholder="What's your calories goal?"
          />
          <Input
            type="number"
            value={newPrice}
            onChange={(event) => setNewPrice(event.target.value)}
            placeholder="What's the maximum you'd spend (for a week's meals)?"
          />
          {/* <Checkbox
              id="rememberMyPreferences"
              checked={rememberMyPreferences}
              onCheckedChange={() => setRememberMyPreferences(!rememberMyPreferences)}
            />
            <Label htmlFor="show-random">Remember My Preferences</Label> */}
          <Button
            disabled={!newIdea}
            title={
              newIdea
                ? "Save your idea to the database"
                : "You must enter an idea first"
            }
            onClick={async () => {
              await sendUserInput({dietaryRestriction: newIdea, calories: newCalories, price: newPrice});
              //if (!rememberMyPreferences) {
                setNewIdea("")
                setNewCalories("")
                setNewPrice("")
              //}
              console.log("set ideas, calories, price");
              showMenu();
            }}
            className="min-w-fit"
          >
            Save idea
          </Button>
          <div>
            {true && <p>hiddne</p>}
          </div>
        </div>
        
      {/* <header>
        <h1>Acme Chat</h1>
        <p>
          Connected as <strong>{NAME}</strong>
        </p>
      </header>
      {messages?.map((message) => (
        <article
          key={message._id}
          className={message.author === NAME ? "message-mine" : ""}
        >
          <div>{message.author}</div>
          <p>{message.body}</p>
        </article>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({ body: newMessageText, author: NAME });
          setNewMessageText("");
        }}
      >
        <input
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="Write a message…"
        />
        <button type="submit" disabled={!newMessageText}>
          Send
        </button>
      </form> */}
    </main>
  );
}

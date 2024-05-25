import { useContext, useEffect } from "react"
import { Input } from "../ui/input"
import { Button } from "@/components/ui/button"
import { GuesserContext } from "./GuesserContext"

const GuesserActions = () => {
  const { guessValue, randomizeValue, state } = useContext(GuesserContext);
  useEffect(() => {
    randomizeValue();
  }, [])
  return (
    <form onSubmit={(ev) => {
      ev.preventDefault();
      const form = ev.target as HTMLFormElement;
      const guessInputEl = form.elements.namedItem('guess') as HTMLInputElement;
      guessValue(guessInputEl.value);
      form.reset();
    }} className="flex flex-col items-center gap-4 text-center">
      <Input data-testid="guessInputEl" disabled={state !== 'idle'} name="guess" type="number" min={1} max={5} placeholder="type your guess here.." className="max-w-56 mx-auto" />
      {
        state === 'idle' ? <Button data-testid="submitBtn">Submit</Button> :<Button onClick={(ev) => {
          ev.preventDefault();
          randomizeValue();
        }} data-testid="tryAgainBtn">Try again</Button>
      }
    </form>
  )
}

export default GuesserActions
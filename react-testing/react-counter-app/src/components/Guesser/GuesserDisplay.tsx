import { useContext } from "react"
import { GuesserContext } from "./GuesserContext"
import guessImage from "../../assets/guess.png";
import sadImage from "../../assets/sad.png";
import happyImage from "../../assets/happy.png";
import { MAX_NUM } from "@/lib/randomizer";

const GuesserDisplay = () => {
  const { randomValue, state } = useContext(GuesserContext);

  switch (state) {
    case 'success':
      return <div><h1 className="text-2xl">Congratulations! Great guess ✅ The random number was {randomValue} </h1><img width={150} src={happyImage} className="mx-auto my-6" /></div>
    case 'failure':
      return <div><h1 className="text-2xl">Wrong guess ❌. The random number was {randomValue}</h1><img width={150} src={sadImage} className="mx-auto my-6" /></div>
    case 'idle':
      return <div>
        <h1 className="text-2xl">Guess an integer between 1 and {MAX_NUM}</h1>
        <img width={150} src={guessImage} className="mx-auto my-6" />
      </div>;
    default:
      break;
  }
}

export default GuesserDisplay
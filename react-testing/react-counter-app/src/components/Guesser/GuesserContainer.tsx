import GuesserDisplay from './GuesserDisplay'
import GuesserActions from './GuesserActions'

const GuesserContainer = () => {
  return (
    <div className='flex flex-col gap-6'>
      <GuesserDisplay />
      <GuesserActions />
    </div>
  )
}

export default GuesserContainer
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CommonButton from '../components/common/button/common-button'

const GetStarted = () => {
  const navigate = useNavigate()
  return (
    <div className="relative overflow-hidden h-screen">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-center pointer-events-none">
        <div className="w-[1100px] h-[550px] bg-white/5 rounded-bl-full rounded-br-full blur-3xl" />
      </div>
      <div className="flex flex-col justify-center items-center text-white gap-4 mt-52 z-50">
        <h1 className="lg:text-5xl sm:text-4xl text-3xl text-center font-semibold">
          Welcome To ClickTrace
        </h1>
        <h3 className="lg:text-3xl sm:text-2xl text-xl text-center">
          Let's do some fun together
        </h3>
        <CommonButton
          label="Let's Play"
          className="rounded-full shadow-md md:mt-20 mt-16 md:text-lg cursor-pointer px-6! py-6! group"
          rightIcon={
            <ArrowRight className="w-4.5! h-4.5! group-hover:ml-2 duration-200" />
          }
          onClick={() => navigate('/onboarding')}
        />
      </div>
    </div>
  )
}

export default GetStarted

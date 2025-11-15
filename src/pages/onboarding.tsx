import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommonButton from '../components/common/button/common-button'
import CommonCard from '../components/common/card/common-card'
import { cn } from '../lib/utils'

const Onboarding = () => {
  const navigate = useNavigate()
  const [selectGrid, setSelectGrid] = useState<string | null>('4X4')

  const handleSelectGrid = (option: string) => {
    setSelectGrid(option)
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-20">
      <h1 className="text-white text-5xl font-semibold">
        Select Your Preferred Grid Size
      </h1>
      <div className="flex items-center gap-2">
        <div className="group cursor-pointer">
          <CommonCard
            title="4 X 4"
            wrapperClassName={cn(
              'bg-transparent border-2 border-primary group-hover:bg-primary text-white w-64 h-52',
              selectGrid === '4X4' && 'bg-primary',
            )}
            headerClassName="text-center text-xl"
            onClick={() => handleSelectGrid('4X4')}
          >
            {[...Array(4)].map((_, rowIndex) => (
              <div
                key={rowIndex as number}
                className="flex justify-center items-center"
              >
                {[...Array(4)].map((_, colIndex) => (
                  <div
                    key={colIndex as number}
                    className="border border-white px-1 py-2 w-5"
                  />
                ))}
              </div>
            ))}
          </CommonCard>
        </div>
        <div className="group cursor-pointer">
          <CommonCard
            title="6 X 6"
            wrapperClassName={cn(
              'bg-transparent border-2 border-primary group-hover:bg-primary text-white w-64 h-52',
              selectGrid === '6X6' && 'bg-primary',
            )}
            headerClassName="text-center text-xl"
            onClick={() => handleSelectGrid('6X6')}
          >
            {[...Array(6)].map((_, rowIndex) => (
              <div
                key={rowIndex as number}
                className="flex justify-center items-center"
              >
                {[...Array(6)].map((_, colIndex) => (
                  <div
                    key={colIndex as number}
                    className="border border-white px-1 py-2 w-5"
                  />
                ))}
              </div>
            ))}
          </CommonCard>
        </div>
      </div>
      <CommonButton
        label="Continue"
        className="rounded-full shadow-md md:text-lg cursor-pointer px-6! py-6! group"
        rightIcon={
          <ArrowRight className="w-4.5! h-4.5! group-hover:ml-2 duration-200" />
        }
        onClick={() => navigate('/home', { state: selectGrid })}
      />
    </div>
  )
}

export default Onboarding

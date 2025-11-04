import { useId, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CommonButton from '../components/common/button/common-button'
import { cn } from '../lib/utils'

const Home = () => {
  const { state } = useLocation()
  const id = useId()
  const [selectedCell, setSelectedCell] = useState<number[]>([])
  const gridSize: Record<string, number> = {
    '4X4': 4,
    '6X6': 6,
  }
  const selectedGridSize = gridSize[state]

  const handleSelectCell = (index: number) => {
    if (selectedCell.includes(index)) {
      setSelectedCell((prev) => prev.filter((cell) => cell !== index))
    } else {
      setSelectedCell((prev) => [...prev, index])
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#171717] w-fit p-4">
        {[...Array(selectedGridSize)].map((_, index) => (
              <CommonButton
                key={id}
                onClick={() => handleSelectCell(index)}
                className={cn(
                  'border border-secondary w-24 h-24 m-1 cursor-pointer',
                  selectedCell[index] ? 'bg-primary' : 'bg-transparent',
                )}
              />
            ))}
      </div>
    </div>
  )
}

export default Home

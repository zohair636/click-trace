import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CommonButton from '../components/common/button/common-button'
import { cn } from '../lib/utils'

const Home = () => {
  const { state } = useLocation()
  const [selectedCell, setSelectedCell] = useState<number[]>([])
  const gridSize: Record<string, number> = {
    '4X4': 4,
    '6X6': 6,
  }
  const [isPaused, setIsPaused] = useState(false)
  const selectedGridSize = gridSize[state]

  const handleSelectCell = (rowIndex: number, colIndex: number) => {
    const value = rowIndex * selectedGridSize + colIndex
    if (selectedCell.includes(value)) {
      setSelectedCell((prev) => prev.filter((cell) => cell !== value))
    } else {
      setSelectedCell((prev) => [...prev, value])
    }
  }

  useEffect(() => {
    if (selectedCell.length > 0) {
      const timer = setTimeout(() => {
        setIsPaused(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [selectedCell])

  useEffect(() => {
    if (!isPaused && selectedCell.length > 0) {
      const timer = setTimeout(() => {
        setSelectedCell((prev) => prev.slice(0, selectedCell.length - 1))
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isPaused, selectedCell])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#171717] w-fit p-4">
        {[...Array(selectedGridSize)].map((_, rowIndex) => (
          <div key={rowIndex as number} className="flex">
            {[...Array(selectedGridSize)].map((_, colIndex) => (
              <CommonButton
                key={colIndex as number}
                onClick={() => {
                  handleSelectCell(rowIndex, colIndex)
                  setIsPaused(true)
                }}
                className={cn(
                  'border border-secondary w-24 h-24 m-1 cursor-pointer',
                  selectedCell.includes(rowIndex * selectedGridSize + colIndex)
                    ? 'bg-primary'
                    : 'bg-transparent',
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CommonButton from '../components/common/button/common-button'
import { Label } from '../components/ui/label'
import { Progress } from '../components/ui/progress'
import { cn } from '../lib/utils'
import { useAppStore } from '../store/app-store'

const Home = () => {
  const { state } = useLocation()
  const [selectedCell, setSelectedCell] = useState<number[]>([])
  const [randomPattern, setRandomPattern] = useState<number[]>([])
  const gridSize: Record<string, number> = {
    '4X4': 4,
    '6X6': 6,
  }
  const [isPaused, setIsPaused] = useState(false)
  const setIsStarted = useAppStore((state) => state.setIsStarted)
  const isStarted = useAppStore((state) => state.isStarted)

  const selectedGridSize = gridSize[state]
  const totalCell = selectedGridSize * selectedGridSize
  const filledCells = selectedCell.length
  const progressValue = Math.ceil((filledCells / totalCell) * 100)

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

  useEffect(() => {
    if (randomPattern.length === selectedGridSize) {
      setIsStarted(false)
    }
    if (isStarted) {
      const grid = selectedGridSize * selectedGridSize
      const newArray: number[] = []
      while (newArray.length < selectedGridSize) {
        const randomIndex = Math.floor(Math.random() * grid)
        if (!newArray.includes(randomIndex)) {
          newArray.push(randomIndex)
        }
      }
      const timer = setTimeout(() => {
        setRandomPattern(newArray)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [randomPattern, isStarted, selectedGridSize, setIsStarted])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (randomPattern.length >= selectedGridSize) {
        setRandomPattern([])
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [randomPattern, selectedGridSize])

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-fit">
        <Progress value={progressValue} className="mb-4" />
        <div className="flex justify-between items-center text-white mb-4">
          <Label className="text-right">Filled Cells: {filledCells}</Label>
          <Label className="text-right">Total Cells: {totalCell}</Label>
        </div>
        <div className="bg-[#171717] p-4">
          {[...Array(selectedGridSize)].map((_, rowIndex) => (
            <div key={rowIndex as number} className="flex">
              {[...Array(selectedGridSize)].map((_, colIndex) => (
                <CommonButton
                  key={colIndex as number}
                  onClick={() => {
                    if (randomPattern.length > 0) return
                    handleSelectCell(rowIndex, colIndex)
                    setIsPaused(true)
                  }}
                  className={cn(
                    'border border-secondary w-24 h-24 m-1',
                    randomPattern.length > 0
                      ? 'cursor-default'
                      : 'cursor-pointer',
                    selectedCell.includes(
                      rowIndex * selectedGridSize + colIndex,
                    )
                      ? 'bg-primary'
                      : 'bg-transparent',
                    randomPattern.includes(
                      rowIndex * selectedGridSize + colIndex,
                    ) && 'bg-primary opacity-40',
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

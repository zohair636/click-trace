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
  const [isPatternMatched, setIsPatternMatched] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [allowedMistakes, setAllowedMistakes] = useState(3)
  const [color, setColor] = useState<'success' | 'error' | 'default'>('default')
  const setIsStarted = useAppStore((state) => state.setIsStarted)
  const isStarted = useAppStore((state) => state.isStarted)
  const colorVariants = {
    success: 'bg-green-800',
    error: 'bg-red-800',
    default: 'bg-primary',
  }

  const selectedGridSize = gridSize[state]
  const totalCell = selectedGridSize * selectedGridSize
  const filledCells = selectedCell.length
  const progressValue = Math.ceil((filledCells / totalCell) * 100)

  const handleSelectCell = (rowIndex: number, colIndex: number) => {
    const value = rowIndex * selectedGridSize + colIndex
    setSelectedIndex(value)
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
    if (!isPaused && selectedCell.length > 0 && isPatternMatched) {
      const timer = setTimeout(() => {
        setSelectedCell((prev) => prev.slice(0, selectedCell.length - 1))
      }, 1400)

      return () => clearTimeout(timer)
    }
  }, [isPaused, selectedCell, isPatternMatched])

  useEffect(() => {
    if (randomPattern.length === selectedGridSize) {
      setIsStarted(false)
    }
    if (isStarted) {
      const newArray: number[] = []
      while (newArray.length < selectedGridSize) {
        const randomIndex = Math.floor(Math.random() * totalCell)
        if (!newArray.includes(randomIndex)) {
          newArray.push(randomIndex)
        }
      }
      const timer = setTimeout(() => {
        setRandomPattern(newArray)
      }, 600)

      return () => clearTimeout(timer)
    }
  }, [randomPattern, isStarted, selectedGridSize, setIsStarted, totalCell])

  useEffect(() => {
    if (displayIndex < randomPattern.length) {
      setHighlightedIndex(randomPattern[displayIndex])
      setIsPaused(true)
      const timer = setTimeout(() => {
        setDisplayIndex((prev) => prev + 1)
      }, 1400)

      return () => clearTimeout(timer)
    } else if (
      displayIndex >= randomPattern.length &&
      randomPattern.length > 0
    ) {
      setIsStarted(false)
      setIsPaused(false)
      // setRandomPattern([])
      // setDisplayIndex(0)
      setHighlightedIndex(null)
    }
  }, [displayIndex, randomPattern, setIsStarted])

  const handlePatternColors = () => {
    if (randomPattern.every((value) => selectedCell.includes(value))) {
      setIsPatternMatched(true)
    }
    if (randomPattern.includes(selectedIndex)) {
      setColor('success')
      const timer = setTimeout(() => {
        setColor('default')
      }, 800)

      return () => clearTimeout(timer)
    } else {
      setAllowedMistakes((prev) => prev - 1)
      setColor('error')
      const timer = setTimeout(() => {
        setColor('default')
      }, 800)

      return () => clearTimeout(timer)
    }
  }

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
                    if (isPaused) return
                    handleSelectCell(rowIndex, colIndex)
                    handlePatternColors()
                  }}
                  className={cn(
                    'border border-secondary md:w-24 md:h-24 sm:w-20 sm:h-20 w-16 h-16 m-1 transition-all fade-in ease-in-out',
                    randomPattern.length > 0
                      ? 'cursor-default'
                      : 'cursor-pointer',
                    selectedCell.includes(
                      rowIndex * selectedGridSize + colIndex,
                    )
                      ? colorVariants[color]
                      : 'bg-transparent',
                    highlightedIndex ===
                      rowIndex * selectedGridSize + colIndex &&
                      'bg-primary opacity-40',
                  )}
                  disabled={allowedMistakes === 0}
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

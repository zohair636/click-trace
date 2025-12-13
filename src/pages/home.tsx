import { CircleArrowRight, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CommonButton from '../components/common/button/common-button'
import CommonDialog from '../components/common/dialog/common-dialog'
import CommonImage from '../components/common/image/common-image'
import { Label } from '../components/ui/label'
import { Progress } from '../components/ui/progress'
import { StarFilledSvg } from '../constants/icons'
import { REPLAY_PATTER_COUNT } from '../constants/localstorage-keys'
import { cn } from '../lib/utils'
import { useAppStore } from '../store/app-store'
import { getSessionStorage, setSessionStorage } from '../utils/session-storage'

const Home = () => {
  const { state } = useLocation()
  const [selectedCell, setSelectedCell] = useState<number[]>([])
  const [randomPattern, setRandomPattern] = useState<number[]>([])
  const gridSize: Record<string, number> = {
    '4X4': 4,
    '6X6': 6,
  }
  const [isPaused, setIsPaused] = useState(false)
  const [openDialog, setOpenDialog] = useState({
    successDialog: false,
    failureDialog: false,
  })
  const [isArrayMatched, setIsArrayMatched] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [allowedMistakes, setAllowedMistakes] = useState(3)
  const [replayPatternCount, setReplayPatternCount] = useState(
    getSessionStorage(REPLAY_PATTER_COUNT) || 0,
  )
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
  const arrayMatched = randomPattern.every((value, index) => {
    return value === selectedCell[index]
  })

  const handleSelectCell = (rowIndex: number, colIndex: number) => {
    const value = rowIndex * selectedGridSize + colIndex
    if (selectedCell.includes(value)) {
      setSelectedCell((prev) => prev.filter((cell) => cell !== value))
    } else {
      setSelectedCell((prev) => [...prev, value])
    }
    if (randomPattern[selectedIndex] === value) {
      setSelectedIndex((prev) => prev + 1)
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

  useEffect(() => {
    if (selectedCell.length > 0) {
      const timer = setTimeout(() => {
        setIsPaused(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [selectedCell])

  useEffect(() => {
    if (randomPattern.length > 0) {
      if (arrayMatched) setIsArrayMatched(true)
      if (arrayMatched) {
        const timer = setTimeout(() => {
          setRandomPattern((prev) => prev.slice(0, randomPattern.length - 1))
          setSelectedCell((prev) => prev.slice(0, selectedCell.length - 1))
        }, 1000)

        return () => clearTimeout(timer)
      }
    }
  }, [arrayMatched, randomPattern, selectedCell])

  useEffect(() => {
    if (isArrayMatched && !randomPattern.length && !selectedCell.length) {
      setOpenDialog((prev) => ({ ...prev, successDialog: true }))
      setIsArrayMatched(false)
    }
  }, [isArrayMatched, randomPattern, selectedCell])

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
      setHighlightedIndex(null)
    }
  }, [displayIndex, randomPattern, setIsStarted])

  const handleReplayPattern = () => {
    if (replayPatternCount === 0) {
      setReplayPatternCount((prev: number) => {
        const updatedValue = prev + 1
        setSessionStorage(REPLAY_PATTER_COUNT, updatedValue)
        return updatedValue
      })
      setIsStarted(true)
      setDisplayIndex(0)
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
                  }}
                  className={cn(
                    'border border-secondary md:w-24 md:h-24 sm:w-20 sm:h-20 w-16 h-16 m-1 transition-all fade-in ease-in-out hover:opacity-40',
                    isPaused ? 'cursor-default' : 'cursor-pointer',
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
        <CommonButton
          label="Replay Pattern"
          onClick={handleReplayPattern}
          disabled={replayPatternCount === 1 || isStarted || isPaused}
          className="mt-4"
        />
      </div>
      {openDialog.successDialog && (
        <CommonDialog
          open={openDialog.successDialog}
          onOpenChange={(open) =>
            setOpenDialog((prev) => ({ ...prev, successDialog: open }))
          }
          title="Awesome!"
          description="You have completed the level!"
          className=""
        >
          <div className="flex items-center gap-4">
            {[...Array(5)].map((_, index) => (
              <CommonImage
                key={index as number}
                src={StarFilledSvg}
                alt="star"
                width={20}
                height={20}
              />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <CommonButton
              label="Replay"
              leftIcon={<RotateCcw />}
              onClick={() => {}}
              className=""
            />
            <CommonButton
              label="Next Challenge"
              rightIcon={<CircleArrowRight />}
              onClick={() => {}}
              className=""
            />
          </div>
        </CommonDialog>
      )}
      <CommonDialog
        open={!openDialog.failureDialog}
        onOpenChange={(open) =>
          setOpenDialog((prev) => ({ ...prev, failureDialog: open }))
        }
        title="So Close!"
        description="Want to try one more time?"
        className=""
      >
        <div className="flex items-center gap-4">
          {[...Array(5)].map((_, index) => (
            <CommonImage
              key={index as number}
              src={StarFilledSvg}
              alt="star"
              width={20}
              height={20}
            />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <CommonButton
            label="Retry"
            leftIcon={<RotateCcw />}
            onClick={() => {}}
            className=""
          />
          <CommonButton
            label="Restart Challenge"
            rightIcon={<CircleArrowRight />}
            onClick={() => {}}
            className=""
          />
        </div>
      </CommonDialog>
    </div>
  )
}

export default Home

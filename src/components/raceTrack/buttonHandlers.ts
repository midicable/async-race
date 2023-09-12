/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  deleteCar,
  deleteWinner,
  getWinners,
  startEngine,
  stopEngine,
  switchEngineToDrivingMode,
} from '../../api/api'
import {
  CAR_WIDTH,
  RACE_LEFT_PADDING,
  RACE_RIGHT_PADDING,
  carsPromises,
} from '../../common/constants'
import StateManager from '../../stateManager/stateManger'
import {
  PaginationState,
  WinnersPaginationState,
} from '../../stateManager/states'
import GaragePagination from '../garagePagination/garagePagination'

const selectButtonHandler = (event: Event): void => {
  const editor: Element | null = document.querySelector('.editor') as Element
  const targetSelectButton: Element | null = event.target as Element
  const targetTrack: Element | null =
    targetSelectButton.parentElement as Element
  const selectedTrackID = Number.parseInt(targetTrack.id, 10)

  StateManager.setState('selected-car-id', { id: selectedTrackID })

  editor.dispatchEvent(new Event('selected'))
}

const removeButtonHandler = async (event: Event): Promise<void> => {
  const targetButton: Element | null = event.target as Element
  const targetTrackRace: Element | null = targetButton.parentElement as Element
  const race: Element | null = document.querySelector('.race') as Element
  const targetTrackRaceID = Number.parseInt(targetTrackRace.id, 10)
  const paginationState = StateManager.getState(
    'garagePagination',
    'pagination'
  ) as PaginationState
  const winnersPaginationState = StateManager.getState(
    'winnersPagination',
    'pagination'
  ) as WinnersPaginationState

  const isDeletedFromGarage = await deleteCar(targetTrackRaceID)
  const isDeletedFromWinners = await deleteWinner(targetTrackRaceID)
  if (isDeletedFromGarage && isDeletedFromWinners) {
    if (race.children.length === 1 && paginationState.page > 1) {
      StateManager.setState('garagePagination', {
        page: paginationState.page - 1,
      })
    }

    const [winners] = await getWinners(
      winnersPaginationState.page,
      10,
      winnersPaginationState.sort,
      winnersPaginationState.order
    )
    if (!winners.length && winnersPaginationState.page > 1) {
      StateManager.setState('winnersPagination', {
        page: winnersPaginationState.page - 1,
        sort: winnersPaginationState.sort,
        order: winnersPaginationState.order,
      })
    }
    GaragePagination.update()
  }
}

const animateCar = async (id: number): Promise<[number, number]> => {
  const targetTrack: Element | null = document.getElementById(
    `${id}`
  ) as Element
  const targetStartButton: HTMLButtonElement | null = targetTrack.querySelector(
    '.engine-start-button'
  ) as HTMLButtonElement
  const targetStopButton: HTMLButtonElement | null = targetTrack.querySelector(
    '.engine-stop-button'
  ) as HTMLButtonElement
  const resetButton = document.querySelector(
    '.editor__reset-button'
  ) as HTMLButtonElement
  const targetCar: HTMLElement | null = targetTrack.querySelector(
    '.car'
  ) as HTMLElement
  const targetCarStyle = targetCar.style

  const [distance, velocity] = await startEngine(id)
  const animationDuration = Math.floor(distance / velocity)

  targetStartButton.disabled = true
  targetStopButton.disabled = false
  resetButton.disabled = false

  const raceDistance =
    targetTrack.clientWidth -
    (RACE_LEFT_PADDING + RACE_RIGHT_PADDING + CAR_WIDTH)
  const animationCarVelocity = raceDistance / animationDuration

  let position = 0
  let prevTimestamp = Date.now()
  let isEngineOk = true
  let isEngineStarted = true

  targetTrack.addEventListener('stopped', () => {
    isEngineStarted = false
  })

  return new Promise((resolve, reject) => {
    function animate(): void {
      const currTimestamp = Date.now()
      const dt = Math.floor(currTimestamp - prevTimestamp)
      const dx = Math.floor(animationCarVelocity * dt)
      prevTimestamp = currTimestamp

      position += dx
      targetCarStyle.transform = `translateX(${position}px)`

      if (position < raceDistance && isEngineOk && isEngineStarted) {
        requestAnimationFrame(animate)
      } else if (!isEngineStarted) {
        targetCarStyle.transform = 'initial'
      } else if (isEngineOk) {
        resolve([id, Date.now()])
      } else {
        reject(new Error('Car engine has been broken!'))
      }
    }

    switchEngineToDrivingMode(id).catch(() => {
      isEngineOk = false
    })

    requestAnimationFrame(animate)
  })
}

const aButtonHandler = async (event: Event): Promise<void> => {
  const targetButton: HTMLButtonElement | null =
    event.target as HTMLButtonElement
  const targetTrack: Element | null = targetButton.parentElement as Element

  const targetTrackID: number = Number.parseInt(targetTrack.id, 10)

  carsPromises.push(animateCar(targetTrackID))
}

const bButtonHandler = async (event: Event): Promise<void> => {
  const targetButton: HTMLButtonElement | null =
    event.target as HTMLButtonElement
  const targetTrack: Element | null = targetButton.parentElement as Element
  const targetTrackID: number = Number.parseInt(targetTrack.id, 10)
  const targetStartButton: HTMLButtonElement | null = targetTrack.querySelector(
    '.engine-start-button'
  ) as HTMLButtonElement
  const targetCar: HTMLElement | null = targetTrack.querySelector(
    '.car'
  ) as HTMLElement
  const targetCarStyle = targetCar.style

  const isEgineStopped = await stopEngine(targetTrackID)

  if (isEgineStopped) {
    targetCarStyle.transform = 'initial'
    carsPromises.pop()
    targetButton.disabled = true
    targetStartButton.disabled = false
    targetTrack.dispatchEvent(new Event('stopped'))
  }
}

export {
  selectButtonHandler,
  removeButtonHandler,
  aButtonHandler,
  bButtonHandler,
  animateCar,
}

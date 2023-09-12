/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  createCar,
  createWinner,
  getCar,
  getWinner,
  updateCar,
  updateWinner,
} from '../../api/api'
import { createRandomCarColor, createRandomCarName } from '../../common/utils'
import StateManager from '../../stateManager/stateManger'
import { InputState, SelectedCarState } from '../../stateManager/states'
import GaragePagination from '../garagePagination/garagePagination'
import Car from '../../models/car'
import Editor from './editor'
import { animateCar } from '../raceTrack/buttonHandlers'
import { carsPromises } from '../../common/constants'

const createButtonHandler = async (): Promise<void> => {
  const name = (
    StateManager.getState('create-car-text-input', 'input') as InputState
  ).value
  const color = (
    StateManager.getState('create-car-color-input', 'input') as InputState
  ).value

  StateManager.setState('create-car-text-input', {
    value: '',
    disabled: false,
  } as InputState)
  StateManager.setState('create-car-color-input', {
    value: '#000000',
    disabled: false,
  } as InputState)

  await createCar(name, color)

  GaragePagination.update()
  Editor.update()
}

const updateButtonHandler = async (): Promise<void> => {
  const { id } = StateManager.getState(
    'selected-car-id',
    'selected'
  ) as SelectedCarState
  const { value: name } = StateManager.getState(
    'update-car-text-input',
    'input'
  ) as InputState
  const { value: color } = StateManager.getState(
    'update-car-color-input',
    'input'
  ) as InputState

  StateManager.setState('update-car-text-input', {
    value: '',
    disabled: true,
  })
  StateManager.setState('update-car-color-input', {
    value: '#000000',
    disabled: true,
  })
  StateManager.setState('update-car-button', {
    disabled: true,
  })

  const isUpdated = await updateCar(id, name, color)
  if (isUpdated) {
    Editor.update()
    GaragePagination.update()
  }
}

const generateButtonHandler = async (): Promise<void> => {
  const carCreationPromises: Promise<Car>[] = []

  for (let i = 0; i < 100; i += 1) {
    const name = createRandomCarName()
    const color = createRandomCarColor()

    carCreationPromises.push(createCar(name, color))
  }

  Promise.all(carCreationPromises).then(() => GaragePagination.update())
}

const showWinner = async (id: number, time: number): Promise<void> => {
  const winnerCaption = document.querySelector('.winner-caption') as Element
  const winnerDetails = await getCar(id)

  winnerCaption.textContent = `${winnerDetails.name} went first (${time}s)!`
  winnerCaption.classList.add('winner-caption_visible')
}

const handleWinner = async (id: number, time: number): Promise<void> => {
  showWinner(id, time)
  try {
    const winnerStats = await getWinner(id)
    if (time < winnerStats.time) {
      await updateWinner(id, winnerStats.wins + 1, time)
    } else {
      await updateWinner(id, winnerStats.wins + 1, winnerStats.time)
    }
  } catch (err) {
    await createWinner(id, 1, time)
  }
}

const raceButtonHandler = (): void => {
  const raceButton = document.querySelector(
    '.editor__race-button'
  ) as HTMLButtonElement
  const resetButton = document.querySelector(
    '.editor__reset-button'
  ) as HTMLButtonElement
  const raceTracksIDs = Array.from(
    document.querySelectorAll('.race-track')
  ).map((track) => Number.parseInt(track.id, 10))
  const winnerCaption = document.querySelector('.winner-caption') as Element

  winnerCaption.classList.remove('winner-caption_visible')

  raceTracksIDs.forEach((id) => {
    carsPromises.push(animateCar(id))
  })

  raceButton.disabled = true
  resetButton.disabled = false

  const raceStartTimestamp = Date.now()
  Promise.any(carsPromises)
    .then(([id, raceEndTimestamp]) => {
      const winnerRaceTime = Number.parseFloat(
        ((raceEndTimestamp - raceStartTimestamp) / 1000).toFixed(2)
      )
      while (carsPromises.length > 0) {
        carsPromises.pop()
      }
      handleWinner(id, winnerRaceTime)
    })
    .catch(() => {
      console.log('All cars engines have been stopped!')
    })
}

const resetButtonHandler = (): void => {
  const raceButton = document.querySelector(
    '.editor__race-button'
  ) as HTMLButtonElement
  const resetButton = document.querySelector(
    '.editor__reset-button'
  ) as HTMLButtonElement
  const raceTracks = Array.from(document.querySelectorAll('.race-track'))
  const winnerCaption = document.querySelector('.winner-caption') as Element

  raceButton.disabled = false
  resetButton.disabled = true
  winnerCaption.classList.remove('winner-caption_visible')

  raceTracks.forEach((raceTrack) => {
    const stopButton = raceTrack.querySelector(
      '.engine-stop-button'
    ) as HTMLButtonElement
    stopButton.dispatchEvent(new Event('click'))
  })
  while (carsPromises.length > 0) {
    carsPromises.pop()
  }
}

export {
  createButtonHandler,
  generateButtonHandler,
  updateButtonHandler,
  raceButtonHandler,
  resetButtonHandler,
}

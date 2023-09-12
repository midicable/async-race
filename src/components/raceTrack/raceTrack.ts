/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { createButton, createCarSVG } from '../../common/utils'
import {
  aButtonHandler,
  bButtonHandler,
  removeButtonHandler,
  selectButtonHandler,
} from './buttonHandlers'
import Car from '../../models/car'
import './raceTrack.css'

export default class RaceTrack {
  private static createCar(carColor: string): Element {
    const car = document.createElement('div')

    car.innerHTML = createCarSVG(carColor)
    car.classList.add('car')

    return car
  }

  private static createCarName(carName: string): Element {
    const carNameElement = document.createElement('h3')

    carNameElement.textContent = carName
    carNameElement.classList.add('car-name')

    return carNameElement
  }

  private static createFinishFlag(): Element {
    const finishFlag = document.createElement('img')

    finishFlag.src = '../assets/images/finish-flag.png'
    finishFlag.alt = 'Finish Flag'
    finishFlag.classList.add('finish-flag')

    return finishFlag
  }

  private static createTrack(car: Car): Element {
    const track = document.createElement('div')

    track.append(
      createButton('SELECT', ['button', 'select-button'], selectButtonHandler, {
        disabled: false,
      })
    )
    track.append(
      createButton(
        'REMOVE',
        ['button', 'remove-button'],
        (e) => removeButtonHandler(e),
        { disabled: false }
      )
    )
    track.append(
      createButton(
        'A',
        ['button', 'engine-start-button'],
        (e) => aButtonHandler(e),
        {
          disabled: false,
        }
      )
    )
    track.append(
      createButton('B', ['button', 'engine-stop-button'], bButtonHandler, {
        disabled: true,
      })
    )

    track.append(RaceTrack.createCarName(car.name))
    track.append(RaceTrack.createCar(car.color))
    track.append(RaceTrack.createFinishFlag())

    track.classList.add('race-track')
    track.id = `${car.id}`

    return track
  }

  public static addTrack(car: Car): void {
    const race: Element | null = document.querySelector('.race') as Element

    if (race.children.length < 7) {
      race.append(RaceTrack.createTrack(car))
    }
  }

  public static removeTrack(id: number): void {
    const targetTrack: Element | null = document.getElementById(
      `${id}`
    ) as Element

    targetTrack.remove()
  }

  public static create(cars: Car[]): Element {
    const race = document.createElement('div')
    const winnerCaption = document.createElement('h1')

    cars.forEach((car) => {
      race.append(RaceTrack.createTrack(car))
    })
    winnerCaption.classList.add('winner-caption')
    race.append(winnerCaption)
    race.classList.add('race')

    return race
  }
}

/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { getCars } from '../../api/api'
import { carsPromises } from '../../common/constants'
import { createButton } from '../../common/utils'
import StateManager from '../../stateManager/stateManger'
import { PaginationState } from '../../stateManager/states'
import RaceTrack from '../raceTrack/raceTrack'
import { nextButtonHandler, prevButtonHandler } from './buttonHandlers'
import './garagePagination.css'

export default class GaragePagination {
  private static createHeader(carsTotalCount: number): Element {
    const paginationHeader = document.createElement('h1')

    paginationHeader.textContent = `Garage (${carsTotalCount})`
    paginationHeader.classList.add('pagination__header')

    return paginationHeader
  }

  private static updateHeader(carsTotalCount: number): void {
    const paginationHeader: Element | null = document.querySelector(
      '.pagination__header'
    ) as Element

    paginationHeader.textContent = `Garage (${carsTotalCount})`
  }

  private static createPageNumber(pageNumber: number): Element {
    const pageNumberElement = document.createElement('h2')

    pageNumberElement.textContent = `Page #${pageNumber}`
    pageNumberElement.classList.add('pagination__page-number')

    return pageNumberElement
  }

  private static updatePageNumber(pageNumber: number): void {
    const pageNumberElement: Element | null = document.querySelector(
      '.pagination__page-number'
    ) as Element

    pageNumberElement.textContent = `Page #${pageNumber}`
  }

  public static async update(): Promise<void> {
    const pagination: Element | null = document.querySelector(
      '.pagination'
    ) as Element
    const buttonPrev: HTMLButtonElement | null = document.querySelector(
      '.button-prev'
    ) as HTMLButtonElement
    const buttonNext: HTMLButtonElement | null = document.querySelector(
      '.button-next'
    ) as HTMLButtonElement
    const race: Element | null = document.querySelector('.race') as Element

    const paginationState = StateManager.getState(
      'garagePagination',
      'pagination'
    ) as PaginationState
    const [cars, carsTotalCount] = await getCars(paginationState.page)

    race.remove()
    pagination.insertBefore(RaceTrack.create(cars), pagination.children[2])
    buttonPrev.disabled = paginationState.page === 1
    buttonNext.disabled = paginationState.page >= Math.ceil(carsTotalCount / 7)
    GaragePagination.updateHeader(carsTotalCount)
    GaragePagination.updatePageNumber(paginationState.page)
  }

  public static async create(): Promise<Element> {
    const pagination = document.createElement('div')
    const paginationState = StateManager.getState(
      'garagePagination',
      'pagination'
    ) as PaginationState

    const [cars, carsTotalCount] = await getCars(paginationState.page)

    pagination.append(GaragePagination.createHeader(carsTotalCount))
    pagination.append(GaragePagination.createPageNumber(paginationState.page))
    pagination.append(RaceTrack.create(cars))
    pagination.append(
      createButton('PREV', ['button', 'button-prev'], prevButtonHandler, {
        disabled: paginationState.page === 1,
      })
    )
    pagination.append(
      createButton('NEXT', ['button', 'button-next'], nextButtonHandler, {
        disabled: paginationState.page >= Math.ceil(carsTotalCount / 7),
      })
    )

    pagination.classList.add('pagination')

    while (carsPromises.length > 0) {
      carsPromises.pop()
    }

    return pagination
  }
}

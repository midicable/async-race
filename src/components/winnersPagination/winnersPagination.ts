/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { getWinners } from '../../api/api'
import { createButton } from '../../common/utils'
import StateManager from '../../stateManager/stateManger'
import { WinnersPaginationState } from '../../stateManager/states'
import WinnersTable from '../winnersTable/winnersTable'
import { nextButtonHandler, prevButtonHandler } from './buttonHandlers'
import './winnersPagination.css'

export default class WinnersPagination {
  private static createHeader(winnersTotalCount: number): Element {
    const paginationHeader = document.createElement('h1')

    paginationHeader.textContent = `Winners (${winnersTotalCount})`
    paginationHeader.classList.add('pagination__header')

    return paginationHeader
  }

  private static updateHeader(carsTotalCount: number): void {
    const paginationHeader: Element | null = document.querySelector(
      '.pagination__header'
    ) as Element

    paginationHeader.textContent = `Winners (${carsTotalCount})`
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
    const winnersTable: Element | null = document.querySelector(
      '.winners-table'
    ) as Element

    const paginationState = StateManager.getState(
      'winnersPagination',
      'pagination'
    ) as WinnersPaginationState
    const [winners, winnersTotalCount] = await getWinners(
      paginationState.page,
      10,
      paginationState.sort,
      paginationState.order
    )

    winnersTable.remove()
    pagination.insertBefore(
      WinnersTable.create(winners),
      pagination.children[2]
    )
    buttonPrev.disabled = paginationState.page === 1
    buttonNext.disabled =
      paginationState.page >= Math.ceil(winnersTotalCount / 10)
    WinnersPagination.updateHeader(winnersTotalCount)
    WinnersPagination.updatePageNumber(paginationState.page)
  }

  public static async create(): Promise<Element> {
    const pagination = document.createElement('div')
    const paginationState = StateManager.getState(
      'winnersPagination',
      'pagination'
    ) as WinnersPaginationState

    const [winners, winnersTotalCount] = await getWinners(
      paginationState.page,
      10,
      paginationState.sort,
      paginationState.order
    )

    pagination.append(WinnersPagination.createHeader(winnersTotalCount))
    pagination.append(WinnersPagination.createPageNumber(paginationState.page))
    pagination.append(WinnersTable.create(winners))
    pagination.append(
      createButton('PREV', ['button', 'button-prev'], prevButtonHandler, {
        disabled: paginationState.page === 1,
      })
    )
    pagination.append(
      createButton('NEXT', ['button', 'button-next'], nextButtonHandler, {
        disabled: paginationState.page >= Math.ceil(winnersTotalCount / 10),
      })
    )

    pagination.classList.add('pagination')

    return pagination
  }
}

/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { getCar } from '../../api/api'
import { createCarSVG } from '../../common/utils'
import Winner from '../../models/winner'
import StateManager from '../../stateManager/stateManger'
import { WinnersPaginationState } from '../../stateManager/states'
import {
  numberSortButtonHandler,
  timeSortButtonHandler,
  winsSortButtonHandler,
} from './sortButtonsHandlers'
import './winnersTable.css'

export default class WinnersTable {
  private static createColumnsCaption(): Element {
    const captionsRow = document.createElement('tr')
    const { sort, order } = StateManager.getState(
      'winnersPagination',
      'pagination'
    ) as WinnersPaginationState

    switch (sort) {
      case 'id':
        if (order === 'ASC') {
          captionsRow.innerHTML = `
            <th id="number-col" class="sort-asc">Number</th>
            <th>Car</th>
            <th>Name</th>
            <th id="wins-col">Wins</th>
            <th id="time-col">Best time (seconds)</th>
          `
        } else {
          captionsRow.innerHTML = `
            <th id="number-col" class="sort-desc">Number</th>
            <th>Car</th>
            <th>Name</th>
            <th id="wins-col">Wins</th>
            <th id="time-col">Best time (seconds)</th>
          `
        }
        break
      case 'wins':
        if (order === 'ASC') {
          captionsRow.innerHTML = `
            <th id="number-col">Number</th>
            <th>Car</th>
            <th>Name</th>
            <th id="wins-col" class="sort-asc">Wins</th>
            <th id="time-col">Best time (seconds)</th>
          `
        } else {
          captionsRow.innerHTML = `
            <th id="number-col">Number</th>
            <th>Car</th>
            <th>Name</th>
            <th id="wins-col" class="sort-desc">Wins</th>
            <th id="time-col">Best time (seconds)</th>
          `
        }
        break
      case 'time':
        if (order === 'ASC') {
          captionsRow.innerHTML = `
            <th id="number-col">Number</th>
            <th>Car</th>
            <th>Name</th>
            <th id="wins-col">Wins</th>
            <th id="time-col" class="sort-asc">Best time (seconds)</th>
          `
        } else {
          captionsRow.innerHTML = `
            <th id="number-col">Number</th>
            <th>Car</th>
            <th>Name</th>
            <th id="wins-col">Wins</th>
            <th id="time-col" class="sort-desc">Best time (seconds)</th>
          `
        }
        break
      default:
        captionsRow.innerHTML = `
          <th id="number-col">Number</th>
          <th>Car</th>
          <th>Name</th>
          <th id="wins-col">Wins</th>
          <th id="time-col">Best time (seconds)</th>
        `
    }

    return captionsRow
  }

  private static async createWinner(winner: Winner): Promise<Element> {
    const winnerDetails = await getCar(winner.id)
    const winnerTableRow = document.createElement('tr')

    winnerTableRow.innerHTML = `
      <td class="id-col">${winner.id}</td>
      <td class="car-col">${createCarSVG(winnerDetails.color)}</td>
      <td class="name-col">${winnerDetails.name}</td>
      <td class="wins-col">${winner.wins}</td>
      <td class="time-col">${winner.time}</td>
    `
    winnerTableRow.classList.add('winner')

    return winnerTableRow
  }

  public static create(winners: Winner[]): Element {
    const table = document.createElement('table')

    table.append(WinnersTable.createColumnsCaption())

    const numberColumnCaption = table.querySelector('#number-col') as Element
    const winsColumnCaption = table.querySelector('#wins-col') as Element
    const timeColumnCaption = table.querySelector('#time-col') as Element

    numberColumnCaption.addEventListener('click', numberSortButtonHandler)
    winsColumnCaption.addEventListener('click', winsSortButtonHandler)
    timeColumnCaption.addEventListener('click', timeSortButtonHandler)

    winners.forEach(async (winner) => {
      table.append(await WinnersTable.createWinner(winner))
    })
    table.classList.add('winners-table')

    return table
  }
}

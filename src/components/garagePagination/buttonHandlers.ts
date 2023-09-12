/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import StateManager from '../../stateManager/stateManger'
import { PaginationState } from '../../stateManager/states'
import GaragePagination from './garagePagination'

const prevButtonHandler = (): void => {
  const currentPage = (
    StateManager.getState('garagePagination', 'pagination') as PaginationState
  ).page

  StateManager.setState('garagePagination', { page: currentPage - 1 })
  GaragePagination.update()
}

const nextButtonHandler = (): void => {
  const currentPage = (
    StateManager.getState('garagePagination', 'pagination') as PaginationState
  ).page

  StateManager.setState('garagePagination', { page: currentPage + 1 })
  GaragePagination.update()
}

export { prevButtonHandler, nextButtonHandler }

/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import StateManager from '../../stateManager/stateManger'
import { WinnersPaginationState } from '../../stateManager/states'
import WinnersPagination from './winnersPagination'

const prevButtonHandler = (): void => {
  const paginationState = StateManager.getState(
    'winnersPagination',
    'pagination'
  ) as WinnersPaginationState

  StateManager.setState('winnersPagination', {
    page: paginationState.page - 1,
    sort: paginationState.sort,
    order: paginationState.order,
  })

  WinnersPagination.update()
}

const nextButtonHandler = (): void => {
  const paginationState = StateManager.getState(
    'winnersPagination',
    'pagination'
  ) as WinnersPaginationState

  StateManager.setState('winnersPagination', {
    page: paginationState.page + 1,
    sort: paginationState.sort,
    order: paginationState.order,
  })

  WinnersPagination.update()
}

export { prevButtonHandler, nextButtonHandler }

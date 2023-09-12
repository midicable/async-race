/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import StateManager from '../../stateManager/stateManger'
import { WinnersPaginationState } from '../../stateManager/states'
import WinnersPagination from '../winnersPagination/winnersPagination'

const numberSortButtonHandler = (): void => {
  const paginationState = StateManager.getState(
    'winnersPagination',
    'pagination'
  ) as WinnersPaginationState

  if (paginationState.sort !== 'id') {
    StateManager.setState('winnersPagination', {
      page: paginationState.page,
      sort: 'id',
      order: paginationState.order,
    })
  } else if (paginationState.order === 'ASC') {
    StateManager.setState('winnersPagination', {
      page: paginationState.page,
      sort: paginationState.sort,
      order: 'DESC',
    })
  } else {
    StateManager.setState('winnersPagination', {
      page: paginationState.page,
      sort: paginationState.sort,
      order: 'ASC',
    })
  }

  WinnersPagination.update()
}

const winsSortButtonHandler = (): void => {
  const paginationState = StateManager.getState(
    'winnersPagination',
    'pagination'
  ) as WinnersPaginationState

  if (paginationState.sort !== 'wins') {
    StateManager.setState('winnersPagination', {
      page: paginationState.page,
      sort: 'wins',
      order: paginationState.order,
    })
  } else if (paginationState.order === 'ASC') {
    StateManager.setState('winnersPagination', {
      page: paginationState.page,
      sort: paginationState.sort,
      order: 'DESC',
    })
  } else {
    StateManager.setState('winnersPagination', {
      page: paginationState.page,
      sort: paginationState.sort,
      order: 'ASC',
    })
  }

  WinnersPagination.update()
}

const timeSortButtonHandler = (): void => {
  const paginationState = StateManager.getState(
    'winnersPagination',
    'pagination'
  ) as WinnersPaginationState

  if (paginationState.sort !== 'time') {
    StateManager.setState('winnersPagination', {
      page: paginationState.page,
      sort: 'time',
      order: paginationState.order,
    })
  } else if (paginationState.order === 'ASC') {
    StateManager.setState('winnersPagination', {
      page: paginationState.page,
      sort: paginationState.sort,
      order: 'DESC',
    })
  } else {
    StateManager.setState('winnersPagination', {
      page: paginationState.page,
      sort: paginationState.sort,
      order: 'ASC',
    })
  }

  WinnersPagination.update()
}

export { numberSortButtonHandler, winsSortButtonHandler, timeSortButtonHandler }

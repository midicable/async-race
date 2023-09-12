/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import {
  ButtonState,
  InputState,
  PaginationState,
  SelectedCarState,
  WinnersPaginationState,
} from './states'

export default class StateManager {
  public static getState(
    componentName: string,
    componentType: string
  ): InputState | PaginationState | ButtonState | SelectedCarState {
    const componentStateJSON = sessionStorage.getItem(componentName)

    switch (componentType) {
      case 'input':
        if (!componentStateJSON) {
          switch (componentName) {
            case 'create-car-text-input':
              return { value: '', disabled: false } as InputState
            case 'create-car-color-input':
              return { value: '#000000', disabled: false } as InputState
            case 'update-car-text-input':
              return { value: '', disabled: true } as InputState
            case 'update-car-color-input':
              return { value: '#000000', disabled: true } as InputState
            default:
              throw new Error('No such input name!')
          }
        }
        return JSON.parse(componentStateJSON) as InputState
      case 'pagination':
        if (!componentStateJSON) {
          switch (componentName) {
            case 'garagePagination':
              return { page: 1 } as PaginationState
            case 'winnersPagination':
              return {
                page: 1,
                sort: 'id',
                order: 'ASC',
              } as WinnersPaginationState
            default:
              throw new Error('No such pagination name!')
          }
        }
        return JSON.parse(componentStateJSON) as PaginationState
      case 'button':
        if (!componentStateJSON) {
          switch (componentName) {
            case 'update-car-button':
              return { disabled: true } as ButtonState
            default:
              throw new Error('No such button name!')
          }
        }
        return JSON.parse(componentStateJSON) as ButtonState
      case 'selected':
        if (!componentStateJSON) {
          return { id: 0 } as SelectedCarState
        }
        return JSON.parse(componentStateJSON) as SelectedCarState
      default:
        throw new Error('No such element type!')
    }
  }

  public static setState(
    componentName: string,
    state:
      | InputState
      | PaginationState
      | ButtonState
      | SelectedCarState
      | WinnersPaginationState
  ): void {
    sessionStorage.setItem(componentName, JSON.stringify(state))
  }
}

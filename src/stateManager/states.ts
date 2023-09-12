interface InputState {
  value: string
  disabled: boolean
}

interface PaginationState {
  page: number
}

interface WinnersPaginationState extends PaginationState {
  sort: string
  order: string
}

interface ButtonState {
  disabled: boolean
}

interface SelectedCarState {
  id: number
}

export {
  InputState,
  PaginationState,
  WinnersPaginationState,
  ButtonState,
  SelectedCarState,
}

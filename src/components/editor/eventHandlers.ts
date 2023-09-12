/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { getCar } from '../../api/api'
import StateManager from '../../stateManager/stateManger'
import { SelectedCarState } from '../../stateManager/states'
import Editor from './editor'
import Car from '../../models/car'

const handleCarSelection = async (): Promise<void> => {
  const { id: selectedTrackID } = StateManager.getState(
    'selected-car-id',
    'selected'
  ) as SelectedCarState
  const selectedCar: Car = await getCar(selectedTrackID)

  StateManager.setState('update-car-text-input', {
    value: selectedCar.name,
    disabled: false,
  })
  StateManager.setState('update-car-color-input', {
    value: selectedCar.color,
    disabled: false,
  })
  StateManager.setState('update-car-button', {
    disabled: false,
  })

  Editor.update()
}

export default handleCarSelection

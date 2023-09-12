/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { createButton, createInput } from '../../common/utils'
import StateManager from '../../stateManager/stateManger'
import { ButtonState } from '../../stateManager/states'
import {
  createButtonHandler,
  generateButtonHandler,
  raceButtonHandler,
  resetButtonHandler,
  updateButtonHandler,
} from './buttonHandlers'
import './editor.css'
import handleCarSelection from './eventHandlers'

export default class Editor {
  public static update = (): void => {
    const editor: Element | null = document.querySelector('.editor') as Element

    editor.innerHTML = ''

    editor.append(
      createInput('create-car-text-input', 'text', ['editor__text-input'])
    )
    editor.append(
      createInput('create-car-color-input', 'color', ['editor__color-input'])
    )
    editor.append(
      createButton(
        'CREATE',
        ['button', 'editor__create-button'],
        createButtonHandler,
        { disabled: false }
      )
    )

    editor.append(
      createInput('update-car-text-input', 'text', [
        'editor__text-input',
        'editor__update-text-input',
      ])
    )
    editor.append(
      createInput('update-car-color-input', 'color', [
        'editor__color-input',
        'editor__update-color-input',
      ])
    )
    editor.append(
      createButton(
        'UPDATE',
        ['button', 'editor__update-button'],
        updateButtonHandler,
        {
          disabled: (
            StateManager.getState('update-car-button', 'button') as ButtonState
          ).disabled,
        }
      )
    )

    editor.append(
      createButton(
        'RACE',
        ['button', 'editor__race-button'],
        raceButtonHandler,
        { disabled: false }
      )
    )
    editor.append(
      createButton(
        'RESET',
        ['button', 'editor__reset-button'],
        resetButtonHandler,
        { disabled: true }
      )
    )
    editor.append(
      createButton(
        'GENERATE CARS',
        ['button', 'editor__generate-button'],
        generateButtonHandler,
        { disabled: false }
      )
    )
  }

  public static create = (): Element => {
    const editor: Element | null = document.createElement('div') as Element

    editor.append(
      createInput('create-car-text-input', 'text', ['editor__text-input'])
    )
    editor.append(
      createInput('create-car-color-input', 'color', ['editor__color-input'])
    )
    editor.append(
      createButton(
        'CREATE',
        ['button', 'editor__create-button'],
        createButtonHandler,
        { disabled: false }
      )
    )

    editor.append(
      createInput('update-car-text-input', 'text', [
        'editor__text-input',
        'editor__update-text-input',
      ])
    )
    editor.append(
      createInput('update-car-color-input', 'color', [
        'editor__color-input',
        'editor__update-color-input',
      ])
    )
    editor.append(
      createButton(
        'UPDATE',
        ['button', 'editor__update-button'],
        updateButtonHandler,
        {
          disabled: (
            StateManager.getState('update-car-button', 'button') as ButtonState
          ).disabled,
        }
      )
    )

    editor.append(
      createButton(
        'RACE',
        ['button', 'editor__race-button'],
        raceButtonHandler,
        { disabled: false }
      )
    )
    editor.append(
      createButton(
        'RESET',
        ['button', 'editor__reset-button'],
        resetButtonHandler,
        { disabled: true }
      )
    )
    editor.append(
      createButton(
        'GENERATE CARS',
        ['button', 'editor__generate-button'],
        generateButtonHandler,
        { disabled: false }
      )
    )

    editor.addEventListener('selected', handleCarSelection)

    editor.classList.add('editor')

    return editor
  }
}

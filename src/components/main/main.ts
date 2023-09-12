import './main.css'

export default class Main {
  public render = (): void => {
    const root: Element | null = document.querySelector('#root') as Element

    const main = document.createElement('main')
    main.classList.add('main-content')

    root.append(main)
  }
}

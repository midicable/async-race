import './header.css'

export default class Header {
  public render(): void {
    const root: Element | null = document.querySelector('#root') as Element
    const header = document.createElement('header')

    header.innerHTML = `
      <nav class="navigation-panel">
        <ul class="navigation-links">
          <li class="navigation-links__link"><a href="/garage">TO GARAGE</a></li>  
          <li class="navigation-links__link"><a href="/winners">TO WINNERS</a></li>
        </ul>
      </nav>  
    `
    header.classList.add('header')

    root.append(header)
  }
}

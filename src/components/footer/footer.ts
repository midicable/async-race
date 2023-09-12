import './footer.css'

export default class Footer {
  public render(): void {
    const root: Element | null = document.querySelector('#root') as Element
    const footer = document.createElement('footer')

    footer.innerHTML = `
    <a href="https://rs.school/js/">
      <img class="rss-course-logo" src="./assets/images/rss-logo.svg" alt="Rolling Scopes School logo">
    </a>
    <p class="copyright">Inspired by <a href="https://github.com/mikhama" class="author-link">@mikhama</a></p>
    <a href="https://github.com/midicable">
      <img class="github-logo" src="./assets/images/github-logo.svg" alt="GitHub logo">
    </a>
    `
    footer.classList.add('footer')

    root.append(footer)
  }
}

/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Routes } from '../common/constants'
import GaragePage from '../pages/garage'
import WinnersPage from '../pages/winners'
import ErrorPage from '../pages/error'

export default class Router {
  private render(path: string): void {
    switch (path) {
      case Routes.root:
        this.goTo(Routes.garage)
        break
      case Routes.garage:
        GaragePage()
        break
      case Routes.winners:
        WinnersPage()
        break
      default:
        ErrorPage()
        break
    }
  }

  private goTo(path: string): void {
    window.history.pushState({ path }, path, path)
    this.render(path)
  }

  public init(): void {
    const { document } = window
    const navigationLinks = document.querySelectorAll('[href^="/"]')

    window.addEventListener('popstate', () => {
      this.render(new URL(window.location.href).pathname)
    })

    navigationLinks.forEach((link) => {
      link.addEventListener('click', (event: Event) => {
        event.preventDefault()

        const eventTarget = event.target as HTMLAnchorElement
        const { pathname: path } = new URL(eventTarget.href)

        this.goTo(path)
      })
    })

    this.render(new URL(window.location.href).pathname)
  }
}

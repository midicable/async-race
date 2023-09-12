/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Header from '../components/header/header'
import Router from '../router/router'
import Main from '../components/main/main'
import Footer from '../components/footer/footer'
import './app.css'

export default class App {
  private router: Router

  private header: Header

  private main: Main

  private footer: Footer

  constructor() {
    this.router = new Router()
    this.header = new Header()
    this.main = new Main()
    this.footer = new Footer()
  }

  public start(): void {
    this.header.render()
    this.main.render()
    this.footer.render()
    this.router.init()
  }
}

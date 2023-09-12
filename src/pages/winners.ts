/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import WinnersPagination from '../components/winnersPagination/winnersPagination'

export default async function WinnersPage(): Promise<void> {
  const main: Element | null = document.querySelector(
    '.main-content'
  ) as Element

  main.innerHTML = ''
  main.append(await WinnersPagination.create())
}

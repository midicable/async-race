/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Editor from '../components/editor/editor'
import GaragePagination from '../components/garagePagination/garagePagination'

export default async function GaragePage(): Promise<void> {
  const main: Element | null = document.querySelector(
    '.main-content'
  ) as Element

  main.innerHTML = ''
  main.append(Editor.create())
  main.append(await GaragePagination.create())
}

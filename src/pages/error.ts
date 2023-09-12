export default function ErrorPage(): void {
  const main: Element | null = document.querySelector(
    '.main-content'
  ) as Element

  main.innerHTML = '404 NOT FOUND'
}

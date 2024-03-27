export function formatDate(date: string) {
  const newDate = date.split("-").reverse().join("/")

  return newDate
}

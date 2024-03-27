export function formatDate(date: string, cutout = false) {
  let newDate = date

  if (cutout) {
    newDate = newDate.split("T")[0]
  }

  newDate = newDate.split("-").reverse().join("/")

  return newDate
}

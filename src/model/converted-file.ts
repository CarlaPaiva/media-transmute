export type ConvertedFile = {
  newFileName: string
  blob: Blob
  result: 'success' | 'error'
}

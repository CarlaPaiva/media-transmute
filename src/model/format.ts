/** Defines a format */
type FormatCategory = 'Image' | 'Audio' | 'Video' | 'File'

export type Format = {
  /** Name o the format */
  name: string
  /** Extension with a dot */
  extension: string
  /** Category of the format */
  category: FormatCategory
}

import { Format } from '../../model/format'
import Converter from '../converter'

const uploadingFormat: string[] = ['video/mp4', 'video/x-m4v', 'video/*']

const optionsToConvertTo: Format[] = [
  {
    name: 'GIF',
    extension: '.gif',
  },
  {
    name: 'MP4',
    extension: '.mp4',
  },
  {
    name: 'AVI',
    extension: '.avi',
  },
  {
    name: 'WMV',
    extension: '.wmv',
  },
  {
    name: 'MP3',
    extension: '.mp3',
  },
]

function VideoConverter(): JSX.Element {
  return (
    <Converter
      allowedUploadingFormats={uploadingFormat}
      optionsToConvertTo={optionsToConvertTo}
    />
  )
}

export default VideoConverter

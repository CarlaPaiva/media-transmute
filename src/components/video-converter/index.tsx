import { Format } from '../../model/format'
import Converter from '../converter'

const uploadingFormat: string[] = ['video/mp4', 'video/x-m4v', 'video/*']

const optionsToConvertTo: Format[] = [
  {
    name: 'GIF',
    extension: '.gif',
    category: 'Image',
  },
  {
    name: 'MP4',
    extension: '.mp4',
    category: 'Video',
  },
  {
    name: 'AVI',
    extension: '.avi',
    category: 'Video',
  },
  {
    name: 'WMV',
    extension: '.wmv',
    category: 'Video',
  },
  {
    name: 'MP3',
    extension: '.mp3',
    category: 'Audio',
  },
  {
    name: 'WAV',
    extension: '.wav',
    category: 'Audio',
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

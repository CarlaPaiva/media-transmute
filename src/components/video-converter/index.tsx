import { Format } from "../../model/format"
import Converter from "../converter"

const uploadingFormat: string[] = [
    ".mp4"
]

const optionsToConvertTo: Format[] = [
    {
        name: "GIF",
        extension: ".gif",
        mimeType: "image/gif"
    },
    {
        name: "MP4",
        extension: ".mp4",
        mimeType: "video/mp4"
    },
    {
        name: "AVI",
        extension: ".avi",
        mimeType: "video/x-msvideo"
    },
    {
        name: "WMV",
        extension: ".wmv",
        mimeType: "video/x-ms-asf"
    },
    {
        name: "MP3",
        extension: ".mp3",
        mimeType: "audio/mp4"
    }
]

function VideoConverter(): JSX.Element {

    return (
        <Converter
            allowedUploadingFormats={uploadingFormat}
            optionsToConvertTo={optionsToConvertTo} />
    )
}

export default VideoConverter
import { Format } from "../../model/format"
import Converter from "../converter"

const uploadingFormat: Format[] = [
    {
        name: "MP4",
        extension: ".mp4",
        mimeType: "video/mp4"
    }
]

const optionsToConvertTo: Format[] = [
    {
        name: "GIF",
        extension: ".gif",
        mimeType: "image/gif"
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
import { memo, useCallback, useMemo, useState } from "react"
import DraggerUpload from "../dragger-upload"
import { Button, Input, Select, Steps, UploadFile } from "antd"
import convertFiles from "../../services/converter"
import { Format } from "../../model/format"
import { ConvertedFile } from "../../model/converted-file"

import './converter.css'
import ConverterSteps from "./converter-steps"
/** Properties of Converter */
type ConverterProps = {
    /** Define allowed types to be uploaded */
    allowedUploadingFormats: Format[]
    /** Formats available to be converted at */
    optionsToConvertTo: Format[]
}

// enum FileStep {
//     Uploading,
//     Finished
// }

const Converter = memo(function ConverterComponent(props: ConverterProps): JSX.Element {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const onUploadDone = useCallback((files: UploadFile[]) => {
        setFileList(files)
    }, [])

    const downloadBlob = useCallback((convertedFile: ConvertedFile) => {
        const url = window.URL.createObjectURL(convertedFile.blob);
        const a = document.createElement("a")
        document.body.appendChild(a)
        a.style.display = "none"
        a.href = url;
        a.target = "_blank"
        a.download = convertedFile.newFileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }, [])

    const convert = useCallback(async () => {
        const blobs = await convertFiles(fileList)

        for (const blob of blobs) {
            downloadBlob(blob)
        }
    }, [downloadBlob, fileList])

    return (
        <ConverterSteps 
            extensionOptions={props.optionsToConvertTo}
            populateFileList={onUploadDone}
            convert={convert} />
    )
})


export default Converter
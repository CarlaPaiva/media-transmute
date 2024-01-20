import { Alert, Button, Select, UploadFile } from "antd"
import DraggerUpload from "../../../dragger-upload"
import "./upload-step.css"
import { memo, useCallback, useMemo, useState } from "react"
import { Format } from "../../../../model/format"

type UploadStepProps = {
    extensionOptions:Format[]
    populateFileList: (files: UploadFile[]) => void
    onConvertClick: () => void
}

type ErrorMessage = {
    isVisible: boolean
    message: string
}

const hideErrorMessage: ErrorMessage = {
    isVisible: false,
    message: ""
}

const fileErrorMessage: ErrorMessage = {
    isVisible: true,
    message: "Please upload at least one file."
}

const formatErrorMessage: ErrorMessage = {
    isVisible: true,
    message: "Please select the format."
}

const UploadStep = memo(function UploadStepComponent(props: Readonly<UploadStepProps>): JSX.Element {
    const [ isErrorMessageVisible, setIsErrorMessageVisible ] = useState<ErrorMessage>()
    const [ files, setFiles ] = useState<UploadFile[]>([])
    const [ format, setFormat ] = useState('')

    const onUploadDone = useCallback((files: UploadFile[]) => {
        setIsErrorMessageVisible(hideErrorMessage)
        setFiles(files)
        props.populateFileList(files)
    }, [props])

    const onSelectedFormatChange = useCallback((value: string) => {
        setFormat(value)
    }, [])
    
    const onClick = useCallback(() => {

        if (files.length <= 0) {
            setIsErrorMessageVisible(fileErrorMessage)
            return
        }

        if (format === '') {
            setIsErrorMessageVisible(formatErrorMessage)
            return
        }

        props.onConvertClick()
    }, [files.length, format, props])

    const options = useMemo(() => {
        return props.extensionOptions.map((item) => {
            return { value: item.extension, label: item.name }
        })
    }, [props.extensionOptions])
    
    return (
        <div className="container">
            <DraggerUpload
                onUploadDone={onUploadDone} />
            <Select
                value={format}
                placeholder="Convert all to..."
                size="large"
                className="container__items"
                onChange={onSelectedFormatChange}
                options={options}
            >
            </Select>
            <Button 
                size="large" 
                type="primary" 
                className="container__items"
                htmlType="button"
                onClick={onClick}>Convert</Button>

            { isErrorMessageVisible?.isVisible && <Alert 
                className="container__items"
                description={isErrorMessageVisible.message} 
                message="Error"
                type="error"
                showIcon />
            }            
        </div>
    )
})

export default UploadStep
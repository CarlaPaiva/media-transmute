import { memo, useCallback, useState } from "react"
import UploadStep from "./upload-step/upload-step"
import { Format } from "../../../model/format"
import { Spin, UploadFile } from "antd"
import ResultStep from "./result-step/result-step"
import { ConvertedFile } from "../../../model/converted-file"

enum Steps {
    Upload = "upload",
    Result = "result"
}

type ConverterStepsProps = {
    extensionOptions:Format[]
    populateFileList: (files: UploadFile[]) => void
    allowedUploadingFormats: string[]
    convertedFiles: ConvertedFile[]
    convert: () => Promise<void>
    clearStates: () => void
    downloadFiles: () => void
    updateSelectedExtension: (extension: string) => void
}

const ConverterSteps = memo(function ConverterStepsComponent(props: ConverterStepsProps): JSX.Element {
    const [ currentStep, setCurrentStep ] = useState<Steps>(Steps.Upload)
    const [ isConverting, setIsConverting ] = useState(false)

    const onConvertClick = useCallback(async () => {
        setIsConverting(true)
        await props.convert()

        setCurrentStep(Steps.Result)
        setIsConverting(false)
    }, [props])

    const convertMoreFiles = useCallback(() => {
        props.clearStates()
        setIsConverting(false)
        setCurrentStep(Steps.Upload)
    }, [props])

    const getUploadStep = useCallback(() => {
        return <UploadStep 
                    allowedUploadingFormats={props.allowedUploadingFormats}
                    extensionOptions={props.extensionOptions}
                    onConvertClick={onConvertClick}
                    populateFileList={props.populateFileList}
                    updateSelectedExtension={props.updateSelectedExtension} />
    }, [props.allowedUploadingFormats, props.extensionOptions, props.populateFileList, props.updateSelectedExtension, onConvertClick])

    const getResultStep = useCallback(() => {
        return <ResultStep 
                    convertedItems={props.convertedFiles}
                    downloadFiles={props.downloadFiles}
                    convertMoreFiles={convertMoreFiles} />
    }, [convertMoreFiles, props.convertedFiles, props.downloadFiles])

    const converterSteps = {
        upload:  getUploadStep(),
        result: getResultStep()
    }

    return (
        <>
            { converterSteps[currentStep] }
            <Spin 
                tip="Converting..." 
                size="large" 
                spinning={isConverting}
                fullscreen
            />
            
        </>
    )
})

export default ConverterSteps
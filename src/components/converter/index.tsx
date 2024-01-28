import { memo, useCallback, useState } from 'react'
import convertFiles from '../../services/converter'
import { Format } from '../../model/format'
import { ConvertedFile } from '../../model/converted-file'
import ConverterSteps from './converter-steps'
import { UploadFile } from 'antd'
import './converter.css'
/** Properties of Converter */
type ConverterProps = {
  /** Define allowed types to be uploaded */
  allowedUploadingFormats: string[]
  /** Formats available to be converted at */
  optionsToConvertTo: Format[]
}

const Converter = memo(function ConverterComponent(
  props: ConverterProps,
): JSX.Element {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([])
  const [selectedExtension, setSelectedExtension] = useState('')

  const onUploadDone = useCallback((files: UploadFile[]) => {
    setFileList(files)
  }, [])

  const downloadBlob = useCallback((convertedFile: ConvertedFile) => {
    const url = window.URL.createObjectURL(convertedFile.blob)
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.style.display = 'none'
    a.href = url
    a.target = '_blank'
    a.download = convertedFile.newFileName
    a.click()
    window.URL.revokeObjectURL(url)
  }, [])

  const convert = useCallback(async () => {
    const files = await convertFiles(fileList, selectedExtension)
    setConvertedFiles(files)
  }, [fileList, selectedExtension])

  const downloadFiles = useCallback(() => {
    convertedFiles.forEach((file) => {
      if (file.result === 'error') {
        return
      }

      downloadBlob(file)
    })
  }, [convertedFiles, downloadBlob])

  const clearStates = useCallback(() => {
    setFileList([])
    setConvertedFiles([])
  }, [])

  return (
    <ConverterSteps
      allowedUploadingFormats={props.allowedUploadingFormats}
      convertedFiles={convertedFiles}
      extensionOptions={props.optionsToConvertTo}
      populateFileList={onUploadDone}
      convert={convert}
      clearStates={clearStates}
      downloadFiles={downloadFiles}
      updateSelectedExtension={setSelectedExtension}
    />
  )
})

export default Converter

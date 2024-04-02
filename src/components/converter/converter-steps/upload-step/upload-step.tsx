/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Button, Cascader, UploadFile } from 'antd'
import DraggerUpload from '../../../dragger-upload'
import './upload-step.css'
import { memo, useCallback, useMemo, useState } from 'react'
import { Format } from '../../../../model/format'

type UploadStepProps = {
  extensionOptions: Format[]
  allowedUploadingFormats: string[]
  populateFileList: (files: UploadFile[]) => void
  onConvertClick: () => void
  updateSelectedExtension: (extension: string) => void
}

type ErrorMessage = {
  isVisible: boolean
  message: string
}

type Option = {
  value: string
  label: string
  children?: Option[]
}

const hideErrorMessage: ErrorMessage = {
  isVisible: false,
  message: '',
}

const fileErrorMessage: ErrorMessage = {
  isVisible: true,
  message: 'Please upload at least one file.',
}

const formatErrorMessage: ErrorMessage = {
  isVisible: true,
  message: 'Please select the format.',
}

const UploadStep = memo(function UploadStepComponent(
  props: Readonly<UploadStepProps>,
): JSX.Element {
  const [isErrorMessageVisible, setIsErrorMessageVisible] =
    useState<ErrorMessage>()
  const [files, setFiles] = useState<UploadFile[]>([])
  const [format, setFormat] = useState('')

  const onUploadDone = useCallback(
    (files: UploadFile[]) => {
      setIsErrorMessageVisible(hideErrorMessage)
      setFiles(files)
      props.populateFileList(files)
    },
    [props],
  )

  const acceptedTypes = useMemo(() => {
    let types = ''

    props.allowedUploadingFormats.forEach((type, index) => {
      if (index === props.allowedUploadingFormats.length - 1) {
        types += type
        return
      }

      types += type + ', '
    })

    return types
  }, [props.allowedUploadingFormats])

  const onSelectedFormatChange = useCallback(
    (value: (string | number)[]) => {
      const result = value[1] as string

      if (!result) {
        console.warn('Could not read selected format.')
        return
      }

      setFormat(result)
      props.updateSelectedExtension(result)
    },
    [props],
  )

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
    const opts: Option[] = []

    props.extensionOptions.forEach((item) => {
      if (opts.some((x) => x.label === item.category)) {
        return
      }

      const children = props.extensionOptions.filter(
        (value) => value.category === item.category,
      )

      opts.push({
        label: item.category,
        value: item.category,
        children: children.map((cItem) => {
          return { value: cItem.extension, label: cItem.name, children: [] }
        }),
      })
    })

    return opts
  }, [props.extensionOptions])

  return (
    <div className="container">
      <DraggerUpload accept={acceptedTypes} onUploadDone={onUploadDone} />
      <Cascader
        className="container__items"
        size="large"
        placeholder="Convert all to..."
        options={options}
        dropdownStyle={{ minWidth: '700px' }}
        onChange={onSelectedFormatChange}
      />
      <Button
        size="large"
        type="primary"
        className="container__items"
        htmlType="button"
        onClick={onClick}
      >
        Convert
      </Button>

      {isErrorMessageVisible?.isVisible && (
        <Alert
          className="container__items"
          description={isErrorMessageVisible.message}
          message="Error"
          type="error"
          showIcon
        />
      )}
    </div>
  )
})

export default UploadStep

import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { UploadFile } from "antd";

async function convertFiles(fileList: UploadFile[]): Promise<Blob[]>{
    const blobList: Blob[] = []

    for (const file of fileList) {
        const sourceBuffer = await file.originFileObj?.arrayBuffer() as ArrayBuffer
        console.log('sourceBuffer', sourceBuffer)
        const nameWithoutExt = file.name.split('.')[0]
        const outputName = `${nameWithoutExt}.gif`

        const ffmpeg = createFFmpeg({ log: true });
        await ffmpeg.load();

        ffmpeg.FS(
            "writeFile",
            file.name,
            new Uint8Array(sourceBuffer, 0, sourceBuffer.byteLength)
          );
        
          await ffmpeg.run("-i", file.name, outputName);

          const output = ffmpeg.FS("readFile", outputName);
          blobList.push(new Blob([output.buffer], { type: "image/gif" }))
    }

    return blobList
}

export default convertFiles

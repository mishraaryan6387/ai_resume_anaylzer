import { useDropzone } from "react-dropzone";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export const formatBytes = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** unitIndex;

  return `${parseFloat(value.toFixed(2))} ${units[unitIndex]}`;
};

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      maxFiles: 1,
      maxSize: MAX_FILE_SIZE,
      onDrop: (accepted, rejected) => {
        onFileSelect?.(accepted[0] ?? null);

        if (rejected.length > 0) {
          onFileSelect?.(null);
        }
      },
    });

  const file = acceptedFiles[0];
  const rejectionMessage = fileRejections[0]?.errors[0]?.message;

  return (
    <div className="w-full gradient-border">
      <div
        {...getRootProps({
          className: "uplader-drag-area",
          "aria-label": "Upload a PDF resume",
        })}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="uploader-selected-file">
            <div className="flex min-w-0 items-center gap-3 text-left">
              <img src="/images/pdf.png" alt="" className="size-10 shrink-0" />
              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-700">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatBytes(file.size)}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-sm font-semibold text-indigo-500">
              Change
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            <img
              src="/icons/info.svg"
              alt="Upload"
              className="mx-auto size-20"
            />
            <p className="text-lg text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag
              and drop
            </p>
            <p className="text-lg text-gray-500">PDF (max 20 MB)</p>
          </div>
        )}
      </div>
      {rejectionMessage && (
        <p role="alert" className="px-2 pb-2 text-sm text-red-600">
          {rejectionMessage}
        </p>
      )}
    </div>
  );
};

export default FileUploader;
"use client";
interface FileCardProps {
  file: {
    fileName: string;
    fileSize: number;
    fileType: string;
    lastModified: string;
    presignedUrl: string;
  }
//   roomId: String;
//   onDelete: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
    // const handleDownloadFile = async() => {
    //     const url = await axios.post(`api/getFiles/${roomId}/${file.name}`)

    // }
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 shadow-md w-full max-w-screen-md">
      {/* File Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-md">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            {file.fileType.split("/")[1]?.toUpperCase() || "FILE"}
          </span>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[150px]">
            {file.fileName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      </div>
      <a href={file.presignedUrl} download={file.fileName} className="p-[3px] relative">
      <button className="p-[3px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-4 py-1 h-8 w-28 bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Download
        </div>
        </button>
      </a>
      {/* Delete Button */}
      {/* <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        <XCircleIcon className="w-6 h-6" />
      </button> */}
    </div>
  );
};

export default FileCard;

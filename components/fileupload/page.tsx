"use client";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/components/ui/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const FileType = value.split(".").pop();
  if (value && FileType !== "pdf") {
    return (
      <div className="w-20 h-20 relative">
        <Image
          fill
          src={value}
          alt="serverImage"
          className="rounded-full object-cover"
          sizes="width:100%; height:100%"
          loading="eager"
        />
        <button
          className=" absolute top-0 right-0 rounded-full bg-rose-500"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
  if (value && FileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res[0]?.url);
      }}
      onUploadError={(error: Error) => {
        console.log(`Error: ${error.message}`);
      }}
    />
  );
};
export default FileUpload;

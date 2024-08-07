import React from "react";
import { PaperClipIcon } from "@heroicons/react/24/solid";
import { formatBytes, isPDF, isPreviewable } from "@/helper";

const AttachmentPreview = ({ file }) => {
    return (
        <div className="w-full flex items-center gap-2 py-2 px-3 rounded-md bg-slate-800">
            <div>
                {isPDF(file.file) && (
                    <div className="bg-gray-700 p-2 rounded-md">
                        <PaperClipIcon className="w-6" />
                    </div>
                )}
                {!isPreviewable(file.file) && (
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-700">
                        <PaperClipIcon className="w-6" />
                    </div>
                )}
            </div>
            <div className="flex-1 text-gray-400 text-nowrap text-ellipsis overflow-hidden">
                <h3>{file.file.name}</h3>
                <p className="text-xs">{formatBytes(file.file.size)}</p>
            </div>
        </div>
    );
};

export default AttachmentPreview;


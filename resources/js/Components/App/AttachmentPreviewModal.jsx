import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
    PaperClipIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "@/helper";

const AttachmentPreviewModal = ({
    attachments,
    index,
    show = false,
    onClose = () => {},
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const previewableAttachments = useMemo(() => {
        return attachments.filter((attachment) => isPreviewable(attachment));
    }, [attachments]);

    const attachment = useMemo(() => {
        return previewableAttachments[currentIndex];
    }, [attachments, currentIndex]);

    const close = () => {
        onClose();
    };

    const prev = () => {
        if (currentIndex === 0) {
            return;
        }
        setCurrentIndex(currentIndex - 1);
    };

    const next = () => {
        if (currentIndex === previewableAttachments.length - 1) {
            return;
        }
        setCurrentIndex(currentIndex + 1);
    };

    useEffect(() => {
        setCurrentIndex(index);
    }, [index]);

    return (
        <Dialog open={show} as="div" className="relative z-50" onClose={close}>
            <div className="fixed inset-0 bg-black/50 h-full w-full z-10">
                <div className="flex min-h-full max-w-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="flex flex-col w-full h-full transform overflow-hidden bg-white/5 p-6 backdrop-blur-2xl text-left align-middle shadow-xl transition-all"
                    >
                        <button
                            onClick={close}
                            className="absolute right-3 top-3 w-10 h-10 rounded-full hover:bg-black/10 transition flex items-center justify-center text-gray-100 z-40"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                        <div className="relative group h-full">
                            {currentIndex > 0 && (
                                <div
                                    onClick={prev}
                                    className="absolute opacity-100 text-gray-100 cursor-pointer flex items-center justify-center w-16 h-16 left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 z-30"
                                >
                                    <ChevronLeftIcon className="w-12" />
                                </div>
                            )}
                            {currentIndex <
                                previewableAttachments.length - 1 && (
                                <div
                                    onClick={next}
                                    className="absolute opacity-100 text-gray-100 cursor-pointer flex items-center justify-center w-16 h-16 right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 z-30"
                                >
                                    <ChevronRightIcon className="w-12" />
                                </div>
                            )}

                            {attachment && (
                                <div className="flex items-center justify-center w-full h-full p-3">
                                    {isImage(attachment) && (
                                        <img
                                            src={attachment.url}
                                            className="max-w-full max-h-full"
                                        />
                                    )}
                                    {isVideo(attachment) && (
                                        <div className="flex items-center">
                                            <video
                                                src={attachment.url}
                                                controls
                                                autoPlay
                                            ></video>
                                        </div>
                                    )}
                                    {isAudio(attachment) && (
                                        <div className="relative flex justify-center items-center">
                                            <audio
                                                src={attachment.url}
                                                controls
                                                autoPlay
                                            ></audio>
                                        </div>
                                    )}
                                    {isPDF(attachment) && (
                                        <iframe
                                            src={attachment.url}
                                            className="w-full h-full"
                                        ></iframe>
                                    )}
                                    {!isPreviewable(attachment) && (
                                        <div className="p-32 flex flex-col justify-center items-center text-gray-100">
                                            <PaperClipIcon className="w-10 h-10 mb-3" />

                                            <small>{attachment.name}</small>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default AttachmentPreviewModal;

import { usePage } from "@inertiajs/react";
import React from "react";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    console.log("Conversation:", conversations);
    console.log("Selected Conversation:", selectedConversation);

    return (
        <>
            <span className="text-white">ChatLayout</span>
            <div>{children}</div>
        </>
    );
};

export default ChatLayout;

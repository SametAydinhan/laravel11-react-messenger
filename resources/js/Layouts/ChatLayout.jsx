import { usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    console.log("Conversation:", conversations);
    console.log("Selected Conversation:", selectedConversation);

    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                console.log("Users:", users);
            })
            .joining((user) => {
                console.log("Joining:", user);
            })
            .leaving((user) => {
                console.log("Leaving:", user);
            }).error((error) => {
                console.error("Error:", error);
            });

        return () => {
            Echo.leave("online");
        };
    }, []);

    return (
        <>
            <span className="text-white">ChatLayout</span>
            <div>{children}</div>
        </>
    );
};

export default ChatLayout;

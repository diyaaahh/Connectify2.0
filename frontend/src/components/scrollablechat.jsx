import * as React from 'react'

import ScrollableFeed from 'react-scrollable-feed'
import { isSameSender, isLastMessage,isSameUser, isSameSenderMargin } from '../../config/ChatLogics';
import { ChatState } from '../../context/ChatProvider';
import './ChatBox.css';



export default function ScrollableChat({ messages }) {
    const { user } = ChatState();
    console.log(messages);
  
    return (
      <ScrollableFeed>
        {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <div className="divforpicofsender">
                <img className="picofsender" src={m.sender.pic} alt="User Profile" />
              </div>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginRight: 5,
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "10px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
      </ScrollableFeed>
    );
  }
  

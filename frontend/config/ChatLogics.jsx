export default function getSender(loggedUser, users) {
    // Check if users array is not empty and has at least two elements
    if (users && users.length >= 2) {
      // Check if the first user has the expected properties
      if (users[0] && users[0]._id && users[0].name) {
        // Check if the second user has the expected properties
        if (users[1] && users[1]._id && users[1].name) {
          return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
        }
      }
    }
  
    // Return a default value or handle the error as appropriate for your application
    return "Unknown User";
  }
  export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };
  
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };
  
  export const isSameSenderMargin = (messages, m, i, userId) => {
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 30;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 5;
    else return "auto";
  };
  
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
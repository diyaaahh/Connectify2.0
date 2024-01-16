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
  
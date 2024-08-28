// src/services/ChatService.js
export const fetchChatRooms = async () => {
  const response = await fetch("`http://localhost:8081/api/chat/room");
  if (!response.ok) {
    throw new Error("Failed to fetch chat rooms");
  }
  return response.json();
};

// export const fetchMessages = async (roomId) => {
//   const response = await fetch(`/api/chat/messages/${roomId}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch messages");
//   }
//   return response.json();
// };

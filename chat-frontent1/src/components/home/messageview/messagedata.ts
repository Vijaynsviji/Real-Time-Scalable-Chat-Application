import type { Message } from "../../../utils/types/Types";



export const messageData:Message[] = [
  { id: 1, text: "Hey Vijay, are you awake?", person: "You", date: new Date("2026-02-24T07:30:00"), status: "read" },
  { id: 2, text: "Yeah, just woke up. What's up?", person: "Vijay N S", date: new Date("2026-02-24T07:31:00"), status: "read" },
  { id: 3, text: "The deployment failed last night.", person: "You", date: new Date("2026-02-24T07:32:00"), status: "read" },
  { id: 4, text: "Again? Which service this time?", person: "Vijay N S", date: new Date("2026-02-24T07:33:00"), status: "read" },
  { id: 5, text: "Auth service. JWT validation error.", person: "You", date: new Date("2026-02-24T07:34:00"), status: "read" },
  { id: 6, text: "Did you change the subject payload?", person: "Vijay N S", date: new Date("2026-02-24T07:35:00"), status: "read" },
  { id: 7, text: "Yes… I think that's the issue.", person: "You", date: new Date("2026-02-24T07:36:00"), status: "read" },
  { id: 8, text: "Make sure it's a string, not an object.", person: "Vijay N S", date: new Date("2026-02-24T07:37:00"), status: "read" },
  { id: 9, text: "Let me check logs.", person: "You", date: new Date("2026-02-24T07:38:00"), status: "read" },
  { id: 10, text: "Cool.", person: "Vijay N S", date: new Date("2026-02-24T07:39:00"), status: "read" },

  { id: 11, text: "Yep, it was sending an object.", person: "You", date: new Date("2026-02-24T07:45:00"), status: "read" },
  { id: 12, text: "Classic mistake 😅", person: "Vijay N S", date: new Date("2026-02-24T07:46:00"), status: "read" },
  { id: 13, text: "Fixed and redeploying.", person: "You", date: new Date("2026-02-24T07:47:00"), status: "read" },
  { id: 14, text: "Nice. Fingers crossed.", person: "Vijay N S", date: new Date("2026-02-24T07:48:00"), status: "read" },
  { id: 15, text: "Build passed 🎉", person: "You", date: new Date("2026-02-24T07:55:00"), status: "read" },
  { id: 16, text: "Great start to the day!", person: "Vijay N S", date: new Date("2026-02-24T07:56:00"), status: "read" },

  { id: 17, text: "Did you review the PR I sent?", person: "You", date: new Date("2026-02-24T09:10:00"), status: "read" },
  { id: 18, text: "Not yet. Opening it now.", person: "Vijay N S", date: new Date("2026-02-24T09:12:00"), status: "read" },
  { id: 19, text: "Left a few comments.", person: "Vijay N S", date: new Date("2026-02-24T09:20:00"), status: "read" },
  { id: 20, text: "Checking.", person: "You", date: new Date("2026-02-24T09:22:00"), status: "read" },

  { id: 21, text: "Updated the changes.", person: "You", date: new Date("2026-02-24T09:35:00"), status: "read" },
  { id: 22, text: "Looks good now. Approving.", person: "Vijay N S", date: new Date("2026-02-24T09:40:00"), status: "read" },
  { id: 23, text: "Thanks!", person: "You", date: new Date("2026-02-24T09:41:00"), status: "read" },

  { id: 24, text: "Lunch today?", person: "Vijay N S", date: new Date("2026-02-24T12:00:00"), status: "read" },
  { id: 25, text: "Sure. Same place?", person: "You", date: new Date("2026-02-24T12:01:00"), status: "read" },
  { id: 26, text: "Yeah, 1 PM.", person: "Vijay N S", date: new Date("2026-02-24T12:02:00"), status: "read" },

  { id: 27, text: "Running 5 mins late.", person: "You", date: new Date("2026-02-24T13:05:00"), status: "read" },
  { id: 28, text: "No worries.", person: "Vijay N S", date: new Date("2026-02-24T13:06:00"), status: "read" },

  { id: 29, text: "Back to work 😴", person: "You", date: new Date("2026-02-24T14:10:00"), status: "read" },
  { id: 30, text: "Same here.", person: "Vijay N S", date: new Date("2026-02-24T14:12:00"), status: "read" },

  { id: 31, text: "Client meeting at 4.", person: "Vijay N S", date: new Date("2026-02-24T15:00:00"), status: "read" },
  { id: 32, text: "Got it. I'll prepare the slides.", person: "You", date: new Date("2026-02-24T15:02:00"), status: "read" },
  { id: 33, text: "Add performance metrics.", person: "Vijay N S", date: new Date("2026-02-24T15:05:00"), status: "read" },
  { id: 34, text: "Sure.", person: "You", date: new Date("2026-02-24T15:06:00"), status: "read" },

  { id: 35, text: "Meeting went well!", person: "You", date: new Date("2026-02-24T17:10:00"), status: "read" },
  { id: 36, text: "Nice job 👍", person: "Vijay N S", date: new Date("2026-02-24T17:11:00"), status: "read" },

  { id: 37, text: "Pushing final commits.", person: "You", date: new Date("2026-02-24T18:00:00"), status: "delivered" },
  { id: 38, text: "Okay.", person: "Vijay N S", date: new Date("2026-02-24T18:02:00"), status: "delivered" },

  { id: 39, text: "Done for the day?", person: "Vijay N S", date: new Date("2026-02-24T19:00:00"), status: "delivered" },
  { id: 40, text: "Almost. One last task.", person: "You", date: new Date("2026-02-24T19:02:00"), status: "delivered" },

  { id: 41, text: "Now done 😄", person: "You", date: new Date("2026-02-24T19:30:00"), status: "delivered" },
  { id: 42, text: "Great. Logging off.", person: "Vijay N S", date: new Date("2026-02-24T19:32:00"), status: "delivered" },

  { id: 43, text: "Good night!", person: "You", date: new Date("2026-02-24T22:00:00"), status: "sent" },
  { id: 44, text: "Night!", person: "Vijay N S", date: new Date("2026-02-24T22:01:00"), status: "sent" },

  { id: 45, text: "Morning ☀️", person: "You", date: new Date("2026-02-25T07:30:00"), status: "sent" },
  { id: 46, text: "Morning!", person: "Vijay N S", date: new Date("2026-02-25T07:32:00"), status: "sent" },

  { id: 47, text: "Ready for today's sprint?", person: "Vijay N S", date: new Date("2026-02-25T08:00:00"), status: "sent" },
  { id: 48, text: "Absolutely 💪", person: "You", date: new Date("2026-02-25T08:02:00"), status: "sent" },

  { id: 49, text: "Let's crush it.", person: "Vijay N S", date: new Date("2026-02-25T08:05:00"), status: "sent" },
  { id: 50, text: "On it!", person: "You", date: new Date("2026-02-25T08:06:00"), status: "sent" },

  { id: 51, text: "Server CPU usage looks high.", person: "You", date: new Date("2026-02-25T09:00:00"), status: "sent" },
  { id: 52, text: "Scaling instances now.", person: "Vijay N S", date: new Date("2026-02-25T09:02:00"), status: "sent" },
  { id: 53, text: "Stabilized.", person: "Vijay N S", date: new Date("2026-02-25T09:05:00"), status: "sent" },
  { id: 54, text: "Nice save.", person: "You", date: new Date("2026-02-25T09:06:00"), status: "sent" },
  { id: 55, text: "Teamwork 😎", person: "Vijay N S", date: new Date("2026-02-25T09:07:00"), status: "sent" },
];
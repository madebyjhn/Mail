import { Folder } from "./types";

export const folders: Folder[] = [
  {
    id: "inbox",
    name: "Inbox",
    icon: "inbox",
    count: 120,
  },
  {
    id: "sent",
    name: "Sent",
    icon: "send",
    count: 45,
  },
  {
    id: "drafts",
    name: "Drafts",
    icon: "file-text",
    count: 10,
  },
  {
    id: "spam",
    name: "Spam",
    icon: "alert-triangle",
    count: 5,
  },
  {
    id: "trash",
    name: "Trash",
    icon: "trash-2",
    count: 2,
  },
  {
    id: "archive",
    name: "Archive",
    icon: "archive",
    count: 32,
  },
  {
    id: "important",
    name: "Important",
    icon: "star",
    count: 15,
  },
];

import { Folder } from "./types";

export const folders: Folder[] = [
  {
    id: "inbox",
    name: "Inbox",
    icon: "Inbox",
    count: 120,
  },
  {
    id: "sent",
    name: "Sent",
    icon: "Send",
    count: 45,
  },
  {
    id: "drafts",
    name: "Drafts",
    icon: "FileText",
    count: 10,
  },
  {
    id: "spam",
    name: "Spam",
    icon: "AlertTriangle",
    count: 5,
  },
  {
    id: "trash",
    name: "Trash",
    icon: "Trash2",
    count: 2,
  },
];

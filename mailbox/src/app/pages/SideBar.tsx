import { Button } from "../components/ui/button";
import { folders } from "../lib/mock-data";
import { motion } from "framer-motion";
import {
  Inbox,
  Send,
  FileText,
  AlertTriangle,
  Trash2,
  Archive,
  Star,
  Edit,
} from "lucide-react";
import { useState } from "react";
import Avatar from "../components/Avatar";
import User from "../components/user";

interface SideBarProps {
  selectedFolder: string;
  onSelectFolder: (folder: string) => void;
  onCompose: () => void;
}

const iconMap = {
  Inbox,
  Send,
  FileText,
  AlertTriangle,
  Trash2,
  Archive,
  Star,
};

export default function SideBar({
  selectedFolder,
  onSelectFolder,
  onCompose,
}: SideBarProps) {
  const [isProfilOpen, setIsProfilOpen] = useState(false);
  return (
    <>
      <motion.div
        className="p-6"
        initial={{ opacity: 0, x: -420 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.2, ease: "backIn" }}
      >
        <button className="neu-button rounded-2xl p-4 flex items-center space-x-3 w-full hover:neu-pressed rounded-xl p-2 transition-all duration-200">
          <div className="neu-button rounded-full p-1">
            <Avatar className="w-10 h-10 rounded-full" />
          </div>
          <div className="flex-1 text-left">
            <User />
          </div>
        </button>
      </motion.div>
      <motion.div className="px-6 mb-6">
        <Button
          className="w-full neu-button border-0 theme-accent-bg hover:opacity-90 text-white rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
          onClick={onCompose}
        >
          <Edit className="w-4 h-4 mr-2" />
          Compose
        </Button>
      </motion.div>

      <div className="flex-1 px-6 pb-6">
        <nav className="space-y-2">
          {folders.map((folder, index) => {
            const IconComponent =
              iconMap[folder.icon as keyof typeof iconMap] || Inbox;
            const isSelected = selectedFolder === folder.id;

            return (
              <motion.div
                key={folder.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => onSelectFolder(folder.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isSelected
                      ? "neu-selected theme-accent"
                      : "neu-button theme-text-primary hover:theme-text-primary"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent
                      className={`w-5 h-5 ${
                        isSelected ? "theme-accent" : "theme-text-muted"
                      }`}
                    />
                    <span>{folder.name}</span>
                  </div>
                  {folder.count > 0 && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        isSelected
                          ? "bg-purple-100 text-purple-800"
                          : "neu-button theme-text-muted"
                      }`}
                    >
                      {folder.count}
                    </span>
                  )}
                </button>
              </motion.div>
            );
          })}
        </nav>
        <div className="my-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </div>
        <nav className="space-y-2">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => onSelectFolder("starred")}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                selectedFolder === "starred"
                  ? "neu-selected theme-accent"
                  : "neu-button theme-text-primary hover:theme-text-primary"
              }`}
            >
              <Star
                className={`w-5 h-5 ${
                  selectedFolder === "starred"
                    ? "theme-accent"
                    : "theme-text-muted"
                }`}
              />
              <span>Starred</span>
            </button>
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => onSelectFolder("archive")}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                selectedFolder === "archive"
                  ? "neu-selected theme-accent"
                  : "neu-button theme-text-primary hover:theme-text-primary"
              }`}
            >
              <Archive
                className={`w-5 h-5 ${
                  selectedFolder === "archive"
                    ? "theme-accent"
                    : "theme-text-muted"
                }`}
              />
              <span>Archive</span>
            </button>
          </motion.div>
        </nav>
      </div>
    </>
  );
}

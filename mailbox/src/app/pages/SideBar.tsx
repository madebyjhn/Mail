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
  return (
    <>
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
        {" "}
        {/* Conteneur flexible qui prend l'espace restant, padding horizontal et inférieur */}
        <nav className="space-y-2">
          {" "}
          {/* Navigation avec espacement vertical entre éléments */}
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
                    {" "}
                    {/* Conteneur flex pour l'icône et le nom */}
                    <IconComponent
                      className={`w-5 h-5 ${
                        isSelected ? "theme-accent" : "theme-text-muted"
                      }`}
                    />
                    <span>{folder.name}</span> {/* Nom du dossier */}
                  </div>
                  {folder.count > 0 && ( // Affiche le compteur seulement s'il y a des éléments
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        // Badge de comptage : petite taille, padding, arrondi, gras
                        isSelected // Condition pour le style du badge
                          ? "bg-purple-100 text-purple-800" // Si sélectionné : fond violet clair, texte violet foncé
                          : "neu-button theme-text-muted" // Si non sélectionné : style neumorphique et couleur atténuée
                      }`}
                    >
                      {folder.count} {/* Nombre d'éléments dans le dossier */}
                    </span>
                  )}
                </button>
              </motion.div>
            );
          })}
        </nav>
        {/* Séparateur visuel */}
        <div className="my-6">
          {" "}
          {/* Conteneur avec marge verticale */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>{" "}
          {/* Ligne de séparation avec dégradé horizontal */}
        </div>
        {/* Section navigation additionnelle */}
        <nav className="space-y-2">
          {" "}
          {/* Navigation avec espacement vertical */}
          <motion.div // Conteneur animé pour l'élément "Starred"
            initial={{ x: -20, opacity: 0 }} // État initial : décalé à gauche, invisible
            animate={{ x: 0, opacity: 1 }} // État animé : position normale, visible
            transition={{ delay: 0.3 }} // Délai de 0.3 seconde
            whileHover={{ scale: 1.02 }} // Légère augmentation de taille au survol
            whileTap={{ scale: 0.98 }} // Légère diminution de taille au clic
          >
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium theme-text-primary neu-button rounded-xl transition-all duration-200 hover:theme-text-primary">
              {" "}
              {/* Bouton avec styles complets */}
              <Star className="w-5 h-5 theme-text-muted" />{" "}
              {/* Icône étoile avec couleur atténuée */}
              <span>Starred</span> {/* Texte "Starred" */}
            </button>
          </motion.div>
          <motion.div // Conteneur animé pour l'élément "Archive"
            initial={{ x: -20, opacity: 0 }} // État initial : décalé à gauche, invisible
            animate={{ x: 0, opacity: 1 }} // État animé : position normale, visible
            transition={{ delay: 0.35 }} // Délai de 0.35 seconde
            whileHover={{ scale: 1.02 }} // Légère augmentation de taille au survol
            whileTap={{ scale: 0.98 }} // Légère diminution de taille au clic
          >
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium theme-text-primary neu-button rounded-xl transition-all duration-200 hover:theme-text-primary">
              {" "}
              {/* Bouton avec styles complets */}
              <Archive className="w-5 h-5 theme-text-muted" />{" "}
              {/* Icône archive avec couleur atténuée */}
              <span>Archive</span> {/* Texte "Archive" */}
            </button>
          </motion.div>
        </nav>
      </div>
    </>
  );
}

#!/bin/bash

# Script pour remplacer automatiquement user.id par user.uid dans tout le projet

echo "🔧 Remplacement de user.id par user.uid dans le projet..."

# Remplacer directement dans tous les fichiers sans confirmation
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) -exec sed -i '' 's/user\.id/user.uid/g' {} \;

echo "✅ Remplacement terminé !"
echo ""
echo "🔨 Build du projet..."
npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Build réussi !"
else
  echo ""
  echo "❌ Build échoué"
  exit 1
fi

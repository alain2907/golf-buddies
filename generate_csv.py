import json
import csv

# Charger le fichier JSON corrigé
with open('blog-articles-fixed.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

# Créer le fichier CSV
with open('articles_wordpress.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f, delimiter='\t')

    # En-tête
    writer.writerow(['Titre', 'Contenu', 'Date', 'Catégorie', 'Image', 'Étiquette(s)'])

    # Écrire chaque article
    for article in articles:
        titre = article['title']
        contenu = article['content']
        date = ''  # Laisser vide pour publication immédiate
        categories = ', '.join(article['categories'])
        image = article.get('featured_image_url', '')
        tags = ', '.join(article['tags'])

        writer.writerow([titre, contenu, date, categories, image, tags])

print(f"✅ CSV généré avec succès : articles_wordpress.csv")
print(f"📊 {len(articles)} articles exportés")

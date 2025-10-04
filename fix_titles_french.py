import json
import re

# Charger le fichier JSON
with open('blog-articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

def fix_french_title(title):
    """
    Convertit un titre en style français :
    - Majuscule seulement au début et après les deux-points
    - Majuscules conservées pour les noms propres
    """
    # Noms propres qui doivent garder leur majuscule
    proper_nouns = {
        'Golf', 'Buddies', 'Paris', 'France', 'Île-de-France',
        'National', 'Chantilly', 'Morfontaine'
    }

    # Séparer par les deux-points pour gérer les sous-titres
    parts = title.split(':')
    result_parts = []

    for part in parts:
        words = part.strip().split()
        result = []

        for i, word in enumerate(words):
            # Premier mot de la partie : majuscule
            if i == 0:
                result.append(word.capitalize())
            # Noms propres : garder la majuscule
            elif word in proper_nouns or word.capitalize() in proper_nouns:
                result.append(word.capitalize())
            # Années (ex: 2025) : garder tel quel
            elif word.isdigit():
                result.append(word)
            # Tous les autres mots : minuscules
            else:
                result.append(word.lower())

        result_parts.append(' '.join(result))

    return ' : '.join(result_parts)

def fix_html_titles(html_content):
    """
    Corrige tous les titres H2, H3 et H4 dans le contenu HTML
    """
    def replace_h2(match):
        original = match.group(1)
        fixed = fix_french_title(original)
        return f'<h2>{fixed}</h2>'

    def replace_h3(match):
        original = match.group(1)
        fixed = fix_french_title(original)
        return f'<h3>{fixed}</h3>'

    def replace_h4(match):
        original = match.group(1)
        fixed = fix_french_title(original)
        return f'<h4>{fixed}</h4>'

    html_content = re.sub(r'<h2>(.*?)</h2>', replace_h2, html_content)
    html_content = re.sub(r'<h3>(.*?)</h3>', replace_h3, html_content)
    html_content = re.sub(r'<h4>(.*?)</h4>', replace_h4, html_content)

    return html_content

# Corriger les titres principaux et le contenu HTML
for article in articles:
    # Corriger le titre principal
    article['title'] = fix_french_title(article['title'])

    # Corriger les H2, H3, H4 dans le contenu
    article['content'] = fix_html_titles(article['content'])

# Sauvegarder le fichier corrigé
with open('blog-articles-fixed.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)

print("✅ Titres corrigés avec succès !")
print("📄 Fichier sauvegardé : blog-articles-fixed.json")
print("\n📋 Exemples de titres corrigés :")
for i, article in enumerate(articles[:3], 1):
    print(f"{i}. {article['title']}")

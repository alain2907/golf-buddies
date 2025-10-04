const fs = require('fs');
const https = require('https');
require('dotenv').config({ path: '.env.local' });

// Configuration WordPress
const WORDPRESS_URL = process.env.WORDPRESS_URL;
const USERNAME = process.env.WORDPRESS_USERNAME;
const APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

// Créer les credentials en Base64 pour Basic Auth
const auth = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');

// Fonction pour créer une catégorie si elle n'existe pas
async function getOrCreateCategory(categoryName) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: new URL(WORDPRESS_URL).hostname,
      path: '/wp-json/wp/v2/categories?search=' + encodeURIComponent(categoryName),
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const categories = JSON.parse(data);

        if (categories.length > 0) {
          // Catégorie existe déjà
          console.log(`✓ Catégorie trouvée: ${categoryName} (ID: ${categories[0].id})`);
          resolve(categories[0].id);
        } else {
          // Créer la catégorie
          const postData = JSON.stringify({ name: categoryName });

          const createOptions = {
            hostname: new URL(WORDPRESS_URL).hostname,
            path: '/wp-json/wp/v2/categories',
            method: 'POST',
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
            }
          };

          const createReq = https.request(createOptions, (createRes) => {
            let createData = '';
            createRes.on('data', (chunk) => createData += chunk);
            createRes.on('end', () => {
              const newCategory = JSON.parse(createData);
              console.log(`✓ Catégorie créée: ${categoryName} (ID: ${newCategory.id})`);
              resolve(newCategory.id);
            });
          });

          createReq.on('error', reject);
          createReq.write(postData);
          createReq.end();
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Fonction pour créer un tag
async function getOrCreateTag(tagName) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: new URL(WORDPRESS_URL).hostname,
      path: '/wp-json/wp/v2/tags?search=' + encodeURIComponent(tagName),
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const tags = JSON.parse(data);

        if (tags.length > 0) {
          resolve(tags[0].id);
        } else {
          // Créer le tag
          const postData = JSON.stringify({ name: tagName });

          const createOptions = {
            hostname: new URL(WORDPRESS_URL).hostname,
            path: '/wp-json/wp/v2/tags',
            method: 'POST',
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
            }
          };

          const createReq = https.request(createOptions, (createRes) => {
            let createData = '';
            createRes.on('data', (chunk) => createData += chunk);
            createRes.on('end', () => {
              const newTag = JSON.parse(createData);
              resolve(newTag.id);
            });
          });

          createReq.on('error', reject);
          createReq.write(postData);
          createReq.end();
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Fonction pour publier un article
async function publishArticle(article) {
  try {
    console.log(`\n📝 Publication de: "${article.title}"`);

    // Récupérer les IDs des catégories
    const categoryIds = [];
    for (const catName of article.categories) {
      const catId = await getOrCreateCategory(catName);
      categoryIds.push(catId);
      await new Promise(resolve => setTimeout(resolve, 500)); // Pause 500ms entre chaque catégorie
    }

    // Récupérer les IDs des tags
    const tagIds = [];
    for (const tagName of article.tags) {
      const tagId = await getOrCreateTag(tagName);
      tagIds.push(tagId);
      await new Promise(resolve => setTimeout(resolve, 500)); // Pause 500ms entre chaque tag
    }

    // Préparer les données de l'article
    const postData = JSON.stringify({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      slug: article.slug,
      status: article.status,
      categories: categoryIds,
      tags: tagIds,
      format: 'standard'
    });

    // Publier l'article
    return new Promise((resolve, reject) => {
      const options = {
        hostname: new URL(WORDPRESS_URL).hostname,
        path: '/wp-json/wp/v2/posts',
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 201) {
            const response = JSON.parse(data);
            console.log(`✅ Article publié avec succès !`);
            console.log(`   URL: ${response.link}`);
            console.log(`   ID: ${response.id}`);
            resolve(response);
          } else {
            console.error(`❌ Erreur HTTP ${res.statusCode}:`, data);
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        console.error('❌ Erreur réseau:', error.message);
        reject(error);
      });

      req.write(postData);
      req.end();
    });

  } catch (error) {
    console.error(`❌ Erreur lors de la publication de "${article.title}":`, error.message);
    throw error;
  }
}

// Fonction principale
async function main() {
  try {
    console.log('🚀 Début de la publication des articles sur WordPress');
    console.log(`📍 URL WordPress: ${WORDPRESS_URL}`);
    console.log(`👤 Utilisateur: ${USERNAME}\n`);

    // Charger les articles
    const articlesData = fs.readFileSync('./blog-articles.json', 'utf8');
    const articles = JSON.parse(articlesData);

    console.log(`📚 ${articles.length} articles à publier\n`);
    console.log('═══════════════════════════════════════════════════\n');

    // Publier chaque article avec un délai entre chaque
    for (let i = 0; i < articles.length; i++) {
      await publishArticle(articles[i]);

      // Pause de 5 secondes entre chaque article pour ne pas surcharger le serveur
      if (i < articles.length - 1) {
        console.log('\n⏳ Pause de 5 secondes...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    console.log('\n═══════════════════════════════════════════════════');
    console.log(`\n🎉 Tous les articles ont été publiés avec succès !`);
    console.log(`\n✅ ${articles.length}/${articles.length} articles publiés`);
    console.log(`\n🌐 Visitez votre blog: ${WORDPRESS_URL}`);

  } catch (error) {
    console.error('\n❌ Erreur fatale:', error.message);
    process.exit(1);
  }
}

// Lancer le script
main();

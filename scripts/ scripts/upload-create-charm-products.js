/**
 * Upload images to Shopify Files and create a product per image.
 *
 * Usage in Actions:
 *   - SHOP_DOMAIN and SHOPIFY_ACCESS_TOKEN must be set as repository secrets.
 *   - The workflow dispatch will run this script with the images directory path argument.
 *
 * Usage locally:
 *   SHOP_DOMAIN=your-shop.myshopify.com SHOPIFY_ACCESS_TOKEN=shpat_xxx node scripts/upload-create-charm-products.js ./public/Charms
 *
 * Required scopes on token:
 *   - write_files
 *   - write_products
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const SHOP_DOMAIN = process.env.SHOP_DOMAIN || process.env.SHOPIFY_SHOP_DOMAIN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN;
const API_VERSION = process.env.API_VERSION || '2024-10';

const DEFAULT_PRICE = process.env.DEFAULT_PRICE || '12.00';
const DEFAULT_VENDOR = process.env.DEFAULT_VENDOR || 'Your Vendor';
const DEFAULT_PRODUCT_TYPE = process.env.DEFAULT_PRODUCT_TYPE || 'Charm';
const PUBLISH_PRODUCTS = (process.env.PUBLISH_PRODUCTS || 'true') === 'true';

if (!SHOP_DOMAIN || !ACCESS_TOKEN) {
  console.error('Missing SHOP_DOMAIN or ACCESS_TOKEN environment variables. Aborting.');
  process.exit(1);
}

const IMAGE_EXTS = ['.webp', '.png', '.jpg', '.jpeg', '.gif'];

function makeTitleFromFilename(filename) {
  let name = filename.replace(/\.[^/.]+$/, '');
  name = name.replace(/^\d+[_-]*/, '');
  // drop GUID-like trailing tokens (very conservative)
  name = name.replace(/_[0-9a-fA-F\-]{6,}$/i, '');
  name = name.replace(/[_-]+/g, ' ');
  name = name.replace(/\s+/g, ' ').trim();
  name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return name || filename;
}

async function uploadFileToShopify(filePath) {
  const filename = path.basename(filePath);
  const data = fs.readFileSync(filePath);
  const attachment = data.toString('base64');

  const payload = { file: { filename, attachment } };
  const url = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/files.json`;

  const res = await axios.post(url, payload, {
    headers: {
      'X-Shopify-Access-Token': ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    timeout: 120000
  });
  return res.data.file;
}

async function createProduct(title, bodyHtml, imageSrc, sku, price) {
  const url = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/products.json`;
  const product = {
    product: {
      title,
      body_html: bodyHtml || '',
      vendor: DEFAULT_VENDOR,
      product_type: DEFAULT_PRODUCT_TYPE,
      tags: 'Charm, AutoImported',
      published: PUBLISH_PRODUCTS,
      variants: [{ price: price || DEFAULT_PRICE, sku: sku || '' }],
      images: imageSrc ? [{ src: imageSrc }] : []
    }
  };

  const res = await axios.post(url, product, {
    headers: {
      'X-Shopify-Access-Token': ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    timeout: 120000
  });

  return res.data.product;
}

function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const imagesDir = process.argv[2];
  if (!imagesDir) {
    console.error('Usage: node upload-create-charm-products.js /path/to/images');
    process.exit(1);
  }
  if (!fs.existsSync(imagesDir)) {
    console.error('Directory not found:', imagesDir);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir).filter(f => IMAGE_EXTS.includes(path.extname(f).toLowerCase()));
  console.log(`Found ${files.length} image files in ${imagesDir}.`);

  for (const f of files) {
    const fullPath = path.join(imagesDir, f);
    try {
      console.log(`\nProcessing ${f} ...`);
      const uploaded = await uploadFileToShopify(fullPath);
      console.log(`Uploaded: ${uploaded.filename}`);
      console.log(`Public URL: ${uploaded.public_url}`);

      // small delay to be polite with API
      await pause(700);

      const title = makeTitleFromFilename(f);
      const sku = title.toLowerCase().replace(/\s+/g, '-') + '-001';
      const product = await createProduct(title, `<p>Auto-created product for ${title}</p>`, uploaded.public_url, sku, DEFAULT_PRICE);

      console.log(`Created product id=${product.id} title="${product.title}" handle=${product.handle}`);

      await pause(1000);
    } catch (err) {
      console.error('Error for file', f, err.response ? err.response.data : err.message);
      // continue with next file
      await pause(1500);
    }
  }

  console.log('\nFinished processing files.');
}

main().catch(err => {
  console.error('Fatal error:', err.response ? err.response.data : err.message);
  process.exit(1);
});

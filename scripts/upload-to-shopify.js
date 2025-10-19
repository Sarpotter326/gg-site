const fs = require('fs');
const https = require('https');

// Configuration from environment variables
const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const DRY_RUN = process.env.DRY_RUN === 'true';
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || 'Sarpotter326/gg-site';
const INVENTORY_QUANTITY = parseInt(process.env.INVENTORY_QUANTITY || '10', 10);

// Validate environment variables
if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
  console.error('Error: SHOPIFY_STORE_URL and SHOPIFY_ACCESS_TOKEN must be set');
  console.log('Please configure these as GitHub secrets:');
  console.log('  - SHOPIFY_STORE_URL: Your Shopify store URL (e.g., your-store.myshopify.com)');
  console.log('  - SHOPIFY_ACCESS_TOKEN: Your Shopify Admin API access token');
  process.exit(1);
}

// Read catalog data
const catalogPath = 'data/gg_catalog_with_images.json';
let catalog;
try {
  const catalogData = fs.readFileSync(catalogPath, 'utf8');
  catalog = JSON.parse(catalogData);
  console.log(`Loaded ${catalog.length} products from catalog`);
} catch (error) {
  console.error(`Error reading catalog: ${error.message}`);
  process.exit(1);
}

/**
 * Make a request to Shopify API
 */
function shopifyRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SHOPIFY_STORE_URL,
      path: `/admin/api/2024-01${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
      }
    };

    if (data) {
      const body = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(body);
    }

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(responseData));
          } catch (e) {
            resolve(responseData);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Create a product in Shopify
 */
async function createProduct(item) {
  const product = {
    product: {
      title: item.name,
      body_html: `<p>${item.name} from ${item.brand}</p>`,
      vendor: item.brand,
      product_type: item.category,
      tags: [item.category, item.brand].filter(Boolean).join(', '),
      variants: [
        {
          price: item.price.toString(),
          sku: item.id,
          inventory_management: 'shopify',
          inventory_quantity: INVENTORY_QUANTITY
        }
      ]
    }
  };

  // Add image if available
  if (item.image_url) {
    const imageUrl = `https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/main/public/${item.image_url}`;
    product.product.images = [
      {
        src: imageUrl,
        alt: item.name
      }
    ];
  }

  if (DRY_RUN) {
    console.log(`[DRY RUN] Would create product: ${item.name} (${item.id})`);
    return { success: true, dry_run: true };
  }

  try {
    const response = await shopifyRequest('POST', '/products.json', product);
    console.log(`✓ Created product: ${item.name} (ID: ${response.product.id})`);
    return { success: true, product_id: response.product.id };
  } catch (error) {
    console.error(`✗ Failed to create ${item.name}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Main upload function
 */
async function uploadProducts() {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Starting Shopify product upload`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'LIVE'}`);
  console.log(`Products to process: ${catalog.length}`);
  console.log(`${'='.repeat(60)}\n`);

  const results = {
    total: catalog.length,
    successful: 0,
    failed: 0,
    errors: []
  };

  // Process products with rate limiting (2 requests per second)
  for (let i = 0; i < catalog.length; i++) {
    const item = catalog[i];
    console.log(`[${i + 1}/${catalog.length}] Processing: ${item.name}`);

    const result = await createProduct(item);
    
    if (result.success) {
      results.successful++;
    } else {
      results.failed++;
      results.errors.push({
        product: item.name,
        error: result.error
      });
    }

    // Rate limiting: wait 500ms between requests (2 requests/sec)
    if (i < catalog.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Upload Summary`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Total products: ${results.total}`);
  console.log(`Successful: ${results.successful}`);
  console.log(`Failed: ${results.failed}`);
  
  if (results.errors.length > 0) {
    console.log(`\nErrors:`);
    results.errors.forEach(err => {
      console.log(`  - ${err.product}: ${err.error}`);
    });
  }
  
  console.log(`${'='.repeat(60)}\n`);

  // Exit with error code if there were failures
  if (results.failed > 0 && !DRY_RUN) {
    process.exit(1);
  }
}

// Run the upload
uploadProducts().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

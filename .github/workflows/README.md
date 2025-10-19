# Shopify Upload Charms Workflow

This workflow automates the process of uploading charm products from the catalog to your Shopify store.

## Setup

### 1. Configure GitHub Secrets

You need to add the following secrets to your GitHub repository:

1. Go to your repository Settings → Secrets and variables → Actions
2. Add the following secrets:

- **SHOPIFY_STORE_URL**: Your Shopify store URL (e.g., `your-store.myshopify.com`)
- **SHOPIFY_ACCESS_TOKEN**: Your Shopify Admin API access token

### 2. Get Shopify API Credentials

To get your Shopify API credentials:

1. Log in to your Shopify admin panel
2. Go to Settings → Apps and sales channels → Develop apps
3. Click "Create an app"
4. Give it a name (e.g., "GitHub Product Uploader")
5. Go to "API credentials" tab
6. Click "Configure Admin API scopes"
7. Select the following scopes:
   - `write_products`
   - `read_products`
   - `write_inventory`
8. Click "Save"
9. Click "Install app"
10. Copy the "Admin API access token" - this is your `SHOPIFY_ACCESS_TOKEN`
11. Your store URL is in the format: `your-store-name.myshopify.com`

## Usage

### Manual Trigger (Recommended for first run)

1. Go to the "Actions" tab in your GitHub repository
2. Select "Upload Charms to Shopify" from the workflow list
3. Click "Run workflow"
4. Choose options:
   - **dry_run**: Set to `true` for a test run without making actual changes
5. Click "Run workflow"

### Automatic Trigger

The workflow will automatically run when:
- Changes are pushed to the `main` branch that modify `data/gg_catalog_with_images.json`

## Testing

Before uploading all products, it's recommended to:

1. Run the workflow in **dry-run mode** to verify everything is configured correctly
2. Check the logs to ensure all products are being processed correctly
3. Run in live mode with a small subset of products first (you can manually edit the catalog temporarily)

## Workflow Features

- ✅ Validates catalog JSON before upload
- ✅ Creates products with all metadata (name, price, vendor, category, SKU)
- ✅ Uploads product images from the repository
- ✅ Rate limiting to respect Shopify API limits (2 requests/second)
- ✅ Detailed logging and error reporting
- ✅ Dry-run mode for testing
- ✅ Summary report in GitHub Actions

## Catalog Format

The workflow expects the catalog at `data/gg_catalog_with_images.json` with the following structure:

```json
[
  {
    "id": "BY-BR-001",
    "name": "Avery Bracelet",
    "price": 60,
    "brand": "Brook & York",
    "category": "Bracelets",
    "image_url": "charms/avery-bracelet.jpg"
  }
]
```

## Troubleshooting

### Authentication Errors

- Verify that `SHOPIFY_STORE_URL` is correct (should be `store-name.myshopify.com`)
- Ensure `SHOPIFY_ACCESS_TOKEN` is valid and has the required scopes
- Check that your Shopify app is installed and active

### Rate Limiting

- The script includes built-in rate limiting (2 requests/second)
- If you hit rate limits, the workflow will log errors
- Consider running in batches if you have a very large catalog

### Image Upload Issues

- Ensure image URLs are publicly accessible
- Images should be in the `public/` directory of the repository
- Image paths in the catalog should match actual file locations

## Maintenance

To update products:
1. Modify `data/gg_catalog_with_images.json`
2. Commit and push to the `main` branch
3. The workflow will automatically run and update products

Note: Currently, the workflow creates new products. For updating existing products, you would need to modify the script to check for existing products by SKU first.

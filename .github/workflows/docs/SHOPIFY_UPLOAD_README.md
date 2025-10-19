```markdown
# Upload Charms -> Shopify (workflow)

This branch adds a workflow and a script to upload images from public/Charms to Shopify Files and create one product per image.

Before running the workflow:
1. Add repository secrets:
   - SHOP_DOMAIN = your-shop-name.myshopify.com
   - SHOPIFY_ACCESS_TOKEN = the Admin API token (must have write_files and write_products)
2. Review DEFAULT_* env values in the workflow if you want to change price/vendor/type.
3. From the Actions tab, run the "Upload Charms to Shopify" workflow (workflow_dispatch).
   - Or run the script locally:
     SHOP_DOMAIN=your-shop.myshopify.com SHOPIFY_ACCESS_TOKEN=shpat_xxx node scripts/upload-create-charm-products.js public/Charms

Notes:
- The script creates a product per image. If you want multiple images grouped into the same product, tell me the grouping rule.
- Tokens are sensitive; do not commit them to the repo. Use GitHub repository secrets.
```

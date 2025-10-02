import json
import re
import unicodedata

def slugify(name: str) -> str:
    # Convert to ASCII, lowercase, replace spaces with hyphens, remove invalid chars
    name = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode('ascii')
    name = re.sub(r'[^a-zA-Z0-9\s-]', '', name).strip().lower()
    return re.sub(r'\s+', '-', name)

with open('data/gg_catalog_with_categories.json', 'r') as f:
    items = json.load(f)

for item in items:
    slug = slugify(item['name'])
    item['image_url'] = f'charms/{slug}.jpg'

with open('data/gg_catalog_with_images.json', 'w') as f:
    json.dump(items, f, indent=2)

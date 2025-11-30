#!/usr/bin/env bash
# Safe script to remove middleware.js from the repository and push the change.
# Inspect before running. This will:
#  - remove middleware.js
#  - commit with message
#  - push to origin/main (change branch if you prefer)

set -euo pipefail

BRANCH=${1:-main}

echo "Removing middleware.js on branch: ${BRANCH}"

git checkout ${BRANCH}
git pull origin ${BRANCH}

if [ -f middleware.js ]; then
  git rm middleware.js
  git commit -m "chore: remove middleware redirect (traffic routed to Shopify)"
  echo "Committed removal. Pushing to origin/${BRANCH}..."
  git push origin ${BRANCH}
  echo "Push complete. Middleware removed from ${BRANCH}."
else
  echo "middleware.js not found — nothing to remove."
fi

echo "Done. If this was accidental, you can restore with: git revert HEAD"

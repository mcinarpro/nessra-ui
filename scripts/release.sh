#!/bin/bash
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if version argument is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Version argument required${NC}"
  echo "Usage: ./scripts/release.sh <version>"
  echo "Example: ./scripts/release.sh 0.6.0"
  exit 1
fi

VERSION="$1"
TAG="v$VERSION"
DATE=$(date +%Y-%m-%d)

echo -e "${YELLOW}Starting release ${TAG}...${NC}"

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${RED}Error: Working directory is not clean. Commit or stash changes first.${NC}"
  exit 1
fi

# Check if tag already exists
if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo -e "${RED}Error: Tag ${TAG} already exists${NC}"
  exit 1
fi

# Check if [Unreleased] section has content
if ! grep -q "## \[Unreleased\]" CHANGELOG.md; then
  echo -e "${RED}Error: No [Unreleased] section found in CHANGELOG.md${NC}"
  exit 1
fi

# Update CHANGELOG.md
echo -e "${GREEN}Updating CHANGELOG.md...${NC}"
sed -i "s/## \[Unreleased\]/## [Unreleased]\n\n## [$VERSION] - $DATE/" CHANGELOG.md

# Update package.json version
echo -e "${GREEN}Updating package.json to version ${VERSION}...${NC}"
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" package.json

# Commit changes
echo -e "${GREEN}Committing changes...${NC}"
git add CHANGELOG.md package.json
git commit -m "chore(release): v$VERSION"

# Create tag
echo -e "${GREEN}Creating tag ${TAG}...${NC}"
git tag "$TAG"

# Push commits and tags
echo -e "${GREEN}Pushing to remote...${NC}"
git push && git push --tags

# Extract changelog section for this version
echo -e "${GREEN}Extracting changelog for ${TAG}...${NC}"
NOTES=$(awk "/## \[$VERSION\]/{flag=1; next} /## \[/{flag=0} flag" CHANGELOG.md | sed '/^$/N;/^\n$/d')

# Create GitHub release
echo -e "${GREEN}Creating GitHub release...${NC}"
gh release create "$TAG" --title "$TAG" --notes "$NOTES"

echo -e "${GREEN}✓ Release ${TAG} completed!${NC}"
echo -e "  → https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/releases/tag/${TAG}"

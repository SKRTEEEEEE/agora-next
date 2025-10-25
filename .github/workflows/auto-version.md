name: "🔩 Auto Version & Tag"

on:
  push:
    branches:
      - main

permissions:
  contents: write  # para crear tag

jobs:
  version:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛬
        uses: actions/checkout@v5

      - name: Setup Node ⚙️
        uses: actions/setup-node@v4
        with:
          node-version: 22.5

      - name: Install dependencies 📦
        run: npm ci

      - name: Run Semantic Release 🚀
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npx semantic-release
      - name: Get new version number 🔢
        run: echo "NEW_VERSION=$(npx semantic-release --dry-run | grep 'The next release version is' | awk '{print $6}')" >> $GITHUB_ENV
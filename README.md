# Angular 2 Seed Project

## Description
Angular 2 Seed Project with integrated development and production workflows. Still in development!

## How it works
Develop your Angular 2 app in the src/ folder. Store templates (.html) and style (.css or .scss - sass support included) in this folder (or any subfolder), too.
Code gets compiled into dist/ folder.

## Usage
Important: Npm has to be installed on your machine!

1: Clone repo
```
git clone https://github.com/mschwarzmueller/angular2-seed/tree/experimental
```
2: Install packages
```
npm install
```
3: Start server (includes auto refreshing) and gulp watcher - development workflow (includes sourcemaps, no bundling)
```
npm start
```

4: Visit localhost:3000 (default) if the tab hasn't opened automatically

## Development vs Production
```
npm run build:dev
```
Compiles all TypeScript and SASS code. Copy .html files (including index.html) to dist. Sourcemaps are created, no bundling or compression is used.

```
npm run build:dev.watch
```
Dev workflow but turns on watching to automatically re-run the workflow upon changes.

```
npm run build:production
```
Compiles all TypeScript and SASS code. Copy .html files (including index.html) to dist. No Sourcemaps are created, no bundling is used, but individual files are compressed (gzip).

```
npm run build:dev
```
Compiles all TypeScript and SASS code. Copy .html files (including index.html) to dist. No Sourcemaps are created, code + dependencies is bundled and compressed (gzip).
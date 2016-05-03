# Angular 2 Seed Project

## Description
This repository has the goal of making seeding an Angular 2 project easy. Currently it's in heavy development, as Angular 2 isn't released yet.

## Features
dev/ folder holds TypeScript (Angular 2) code => compiled into app/ folder, bundled into bundle.js (incl. dependencies).

assets/ folder holds other assets (e.g. SCSS code) => compiled into src/ folder.

Bundling of TypeScript is managed via SystemJS Builder. Code compilation is managed via Gulp.

## Usage
Important: Typescript and npm has to be installed on your machine!

1: Clone repo
```
git clone https://github.com/mschwarzmueller/angular2-seed.git
```
2: Install packages
```
npm install
```
3: Start server (includes auto refreshing) and gulp watcher
```
npm start
```

4: Visit localhost:3000 (default) if the tab hasn't opened automatically

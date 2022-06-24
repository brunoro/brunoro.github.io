#!/bin/bash
npm run build
cp src/index.html dist/
cp src/*.otf dist/
cp src/*.ttf dist/
git subtree split --prefix dist/ -b deploy
git push -f "git@github.com:brunoro/brunoro.github.io.git" deploy:master
git branch -D deploy

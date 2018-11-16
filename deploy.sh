#!/bin/bash
npm run build.prod
git subtree split --prefix dist/ -b deploy
git push -f https://github.com/brunoro/brunoro.github.io.git deploy:master
git branch -D deploy
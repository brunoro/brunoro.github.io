#!/bin/bash
npm run build
git subtree split --prefix dist/ -b deploy
git push -f "git@github.com:brunoro/brunoro.github.io.git" deploy:master
git branch -D deploy

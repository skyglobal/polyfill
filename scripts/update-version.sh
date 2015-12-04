#!/bin/bash

set -ex

CURRENT_VERSION=$(node --eval "console.log(require('./package.json').version)")

# update all version numbers in README.md
sed -i .bak -E s/[0-9]+\.[0-9]+\.[0-9]+-?[0-9]*/$CURRENT_VERSION/g README.md

rm README.md.bak

git add README.md

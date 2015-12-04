#!/bin/bash

set -ex

VERSION=$(node --eval "console.log(require('./package.json').version)")

if [[ -z $VERSION ]]; then
    echo "VERSION is not set"

    exit 1
fi

FOLDER="s3://prod-sky-web-toolkit/components/polyfill/$VERSION/"

COUNT=`aws s3 ls $FOLDER | wc -l`

if [[ $COUNT -gt 0 ]]; then
    echo "version already deployed"

    exit 1
fi

echo "Copying files to temporary directory... "
rm -rf compressed
mkdir compressed
cp -R dist/* compressed && cd compressed

for filename in $(find . -type f)
do
    echo "compressed ${filename}"
    gzip -t ${filename} > /dev/null 2>&1 || { gzip -9 ${filename}; mv ${filename}.gz ${filename}; }
done

aws s3 sync . $FOLDER --content-type="application/javascript" --content-encoding="gzip" --cache-control="max-age=31536000"

#!/bin/sh
npx pbjs -t static-module -w es6 -o stairV2.js --keep-case stairV2.proto
npx pbts -o stairV2.d.ts stairV2.js
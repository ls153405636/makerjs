#!/bin/sh
npx pbjs -t static-module -w es6 -o stair_v2.js --keep-case stair_v2.proto
npx pbts -o stair_v2.d.ts stair_v2.js
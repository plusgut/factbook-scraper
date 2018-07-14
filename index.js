#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const geos = require('./scraperTypes/geos');

const factbookDir = process.argv[2];

const types = [{name: 'geos', executer: geos}];
const result = {};
types.forEach(type => {
  result[type.name] = type.executer(path.join(factbookDir, type.name));
});

console.log(JSON.stringify(result, null, 2));
#!/bin/bash

count=$(find . -name '.DS_Store' -type f | wc -l)
find . -name '.DS_Store' -type f -delete
echo "Deleted $count .DS_Store file(s)."

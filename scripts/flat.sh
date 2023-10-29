#!/usr/bin/env bash

echo "flattening code..."

for contract in "StructuredLinkedList"
do
  npx hardhat flatten contracts/$contract.sol > dist/$contract.dist.sol
done

echo "adjusting license..."

SEARCH="\/\/ SPDX-License-Identifier: MIT"
REPLACE=""

for contract in dist/*.sol; do 
    sed -i '' "s/$SEARCH/$REPLACE/g" $contract
    sed -i '' "1s;^;$SEARCH\n\n;" $contract
done

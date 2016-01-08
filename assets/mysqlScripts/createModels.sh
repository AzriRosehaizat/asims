#!/bin/bash
filename='tableList.txt'
while read p; do
    sails generate model $p
done < $filename
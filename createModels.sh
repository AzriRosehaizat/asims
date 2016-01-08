#!/bin/bash
filename='assets/mysqlScripts/tableList.txt'
echo "Start"
while read line; do 
    sails generate model $line
done < $filename
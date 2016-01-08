#!/bin/bash
filename='assets/mysqlScripts/tableList.txt'
echo "Start"
while read line; do 
    sails generate controller $line
done < $filename
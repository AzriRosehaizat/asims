#!/bin/bash
filename='assets/mysqlScripts/tableList.txt'
echo "Start"
<<<<<<< HEAD
while read line; do
=======
while read line; do 
>>>>>>> c8f63db38e398c6fe53ce20b24c456586c219e91
    sails generate model $line
done < $filename
#!/bin/bash
filename='tableList.txt'
<<<<<<< HEAD
while read p; do
=======
while read p; do 
>>>>>>> c8f63db38e398c6fe53ce20b24c456586c219e91
    sails generate model $p
done < $filename
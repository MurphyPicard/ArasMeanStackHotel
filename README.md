![Alt text](./public/images/Homepage.PNG?raw=true "Sneak Peek at the Hotel")

# Ara's Meeeeeaaaaan Hotel


useful info:

see all running processes and accurate PID numbers (windows)
ps -W | grep node

to kill processes when using Git Bash: (notice the double slashes)
taskkill //F //PID 5318008

nodemon:
looks in nodemon.js - currently ignores all public files and verbose shows more info


to go from mongo to my files ...
$ mongoexport --db meantest --collection meantest --out api/data/meantest.json --jsonArray --pretty


to go from my files to mongo ...
$ mongoimport --db hotelData --collection hotelCollection --jsonArray api/data/hotel-data.json

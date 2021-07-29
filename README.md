# Shopping-List

### To install and run locally:

MongoDB should be installed locally.
In server/index.js change the mongoDB connection string variable (line 25) to mongoConnectLocalDB - uncomment it and replace the mongoConnectDockerImage string.  
Run 'cd server' then 'npm install' and then 'node index'  
'cd client' then 'npm install' and then 'npm start'

### To run with Docker:

In server/index.js the mongoDB connection string variable (line 25) should be mongoConnectDockerImage,  
if you want to connect to local DB replace it with mongoConnectDockerLocalDB.  
Run in main dir 'docker-compose up'

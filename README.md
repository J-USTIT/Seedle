HOW TO RUN THE PROJECT:
1. Open the terminal
2. Enter the command 'cd frontend'
3. Enter the command 'npm run dev'
4. Open another terminal (there should be two terminals in total)
5. Enter the command 'cd backend'
6. Enter the command 'npm run dev'
7. Go to your browser and enter 'http://localhost:5173' (enter the port number of the frontend you entered.)

THINGS TO TAKE NOTE OF:
1. Check the .env files in both backend and frontend. Modify them to your needs. (My trefle token is most likely here, if possible change it)
2. Ensure that you have MongoDB when running the project.
3. Ensure that you have internet connection when running the project. 
4. Ensure that the node modules or dependencies are all downloaded. If there is any dependencies missing or in conflict, run 'npm install'.
5. The trefle token only allows for a certain amount of calls per minute. If there is an error, try to wait before trying to query again. If problem still persists then there might be other issues at play.


TROUBLESHOOTING:
- Case of missing dependencies
    - Go to backend and frontend folders and type 'npm install'
    - Rerun the project
- Error Code Status 500, unable to retrieve any data from database (Register, Login, etc.) 
    - Check if there is a connection to the MongoDB. You could try replacing the MONGOURI in the backend .env file with the connection string coming from your MongoDB. 
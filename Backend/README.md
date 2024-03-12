Commands
<pre>
Start server - npm run start
</pre>
<pre>
Build script - npm run build
</pre>
<pre>
Run from build folder - node build/.
</pre>
<pre>
Test script - npm run test
</pre>
<pre>
Prettier - npm run prettier
</pre>
<pre>
Lint - npm run lint
</pre>

Endpoints
<pre>
GET - /api - 404 
</pre>
<pre>
GET - /api/image
</pre>
<pre>
GET - /api/getAllImages
</pre>
<pre>
POST - /api/upload
</pre>
<pre>
GET - /api/image?{filename} - 200 with the converted file with default dimensions as response
</pre>
<pre>
GET - /api/image?{filename}&{width}&{height} - 200 with the converted file as response with specified dimensions
Example : http://localhost:3000/api/image?filename=fish.jpg&width=100&height=200
</pre>

Middlewares
<pre>
validateQuery - to check query string before processing
</pre>
<pre>
handleRequest - to convert image and serve as response
</pre>
<pre>
sendAllImages - to send all image files present in assets folder
</pre>


<pre>
Create a .env and configure variable "PORT" in it.
This will be used to run the application.'
By default, I have pushed the .env file for the purpose of evaluation.
</pre>
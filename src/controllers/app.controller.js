export async function statusCheck(req, res) {
  return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Health Check</title>
  </head>
  <body>
    <h1 style="text-align: center; margin-top: 50px;">Health Check</h1>
    <p id="status" style="text-align: center; margin-top: 50px; font-size: 20px;">Loading...</p>
    <button onclick="checkHealth()" style="display: block; margin: 50px auto 0;padding: 10px 20px; background-color: #008CBA; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Check Health</button>

    <script>
      function checkHealth() {
        const statusEl = document.getElementById("status");
        

        // Replace this with your own health check API endpoint
        const apiUrl = "http://localhost:5000/api/health";

        statusEl.innerHTML = "Checking health...";

        fetch(apiUrl)
          .then((response) => {
            if (response.ok) {
              response.text().then((t)=>{
                
                
                  statusEl.innerHTML =  t;
                
              statusEl.style.color = "green";
              })
            } else {
              statusEl.innerHTML = "The API is down!";
              statusEl.style.color = "red";
            }
          })
          .catch((error) => {
            statusEl.innerHTML = "There was an error checking the health!";
            statusEl.style.color = "red";
          });
      }
    </script>
  </body>
</html>
`)
}
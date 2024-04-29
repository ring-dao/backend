import app from "./app"; 
const port = 3000;

app.listen(port,() => {
  /* eslint-disable no-console */
  console.log(`Listening: ${port}`);
  /* eslint-enable no-console */
});
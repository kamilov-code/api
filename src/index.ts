import server from "./server";

server.listen(process.env.PORT || 443, () => {
  console.log(`Server listening on port`, process.env.PORT || 443);
});

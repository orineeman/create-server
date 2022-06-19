import * as fs from "fs/promises";
import http, { createServer } from "http";

function readMyFile() {
  fs.readFile("./en.txt", "utf-8").then((wordEnToTrans) => {
    console.log(wordEnToTrans);
    writeToMyFile(wordEnToTrans);
  });
}

function writeToMyFile(wordEnToTrans) {
  fs.readFile("./translations.json", "utf-8").then((data) => {
    const dataInJson = JSON.parse(data);
    for (let word of dataInJson) {
      if (word.en === wordEnToTrans) {
        fs.writeFile("./he.txt", word.he);
        console.log(wordEnToTrans, "in hebrew is", word.en);
      }
    }
  });

}
http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write('Hello World!');   
    readMyFile();
    response.end();
}).listen(8000);


# Docx 2 LaTeX

React + Express.js app for converting docx file into LaTeX files using docx2tex library.

## requirements

- Make sure you have Java installed on your machine, so that docx2tex able to run
>Java 1.7 up to 1.15 (more recent versions not yet tested). Java 11 has a bug with file URIs, it should be avoided. Java 13 is safe again.

## running app locally

`git clone https://github.com/abaynk/d2l.git`

`cd d2l`

`npm install`

>Before running please make sure that port 3000 and port 5173 are not in use, so that server and the frontend can run on them successfully

`npm start`

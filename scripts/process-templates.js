const program = require("commander");
const nunjucks = require("nunjucks");
const glob = require("glob");
const fs = require("fs");
const path = require("path");

program.version("0.0.1");
program.option("-c, --bttc-chain-id <bttc-chain-id>", "Bttc chain id", "15001");
program.parse(process.argv);

//joining path of directory
const directoryPath = path.join(__dirname, "..", "**/*.template");
//passsing directoryPath and callback function
glob(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    const bttcChainIdHex = parseInt(program.bttcChainId, 10)
      .toString(16)
      .toUpperCase();

    const data = {
      bttcChainId: program.bttcChainId,
      bttcChainIdHex:
        bttcChainIdHex.length % 2 !== 0 ? `0${bttcChainIdHex}` : bttcChainIdHex,
    };

    const templateString = fs.readFileSync(file).toString();
    const resultString = nunjucks.renderString(templateString, data);
    fs.writeFileSync(file.replace(".template", ""), resultString);
  });

  console.log("All template files have been processed.");
});

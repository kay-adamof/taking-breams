(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)


function extractTextFromXPath(xpath) {
  // Evaluate the XPath expression
  let nodes = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);

  // Initialize an empty array to store the text
  let text = [];

  // Iterate over the nodes returned by the XPath expression
  let node;
  while (node = nodes.iterateNext()) {
    // Extract the text from each node and add it to the array
    text.push(node.textContent);
  }

  // Return the array of text
  return text;
}

// Extract the text from the XPath
let text = extractTextFromXPath('/html/body/div[2]/div[5]/div[3]/div/div[1]/div[5]/div[2]/article/div[2]/h2/a/span');

// Print the extracted text
console.log(text);

console.save(text)


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

function makeXPaths(xpath, n) {
  let XPaths = [];
  for (let i = 1; i <= n; i++) {
    let updatedXPath = xpath.replace(xpath, `/html/body/div[2]/div[5]/div[3]/div/div[1]/div[5]/div[${i}]/article/div[2]/h2/a/span`);
    XPaths.push(updatedXPath);
  }
  return XPaths;
}

function makeTexts(XPaths) {
  let texts = [];
  XPaths.forEach((xpath) => {
    texts.push(extractTextFromXPath(xpath));
  });
  return texts;
}

// Extract the text from the XPath
const XPath = '/html/body/div[2]/div[5]/div[3]/div/div[1]/div[5]/div[2]/article/div[2]/h2/a/span';
const articleQuantity = 10;
const XPaths = makeXPaths(XPath, articleQuantity);
const texts = makeTexts(XPaths);

// Convert the texts array to a JSON string
const jsonString = JSON.stringify(texts);

// Save the JSON string to a file
(function(console) {
  console.save = function(data, filename) {
    if (!data) {
      console.error('Console.save: No data');
      return;
    }

    if (!filename) filename = 'console.json';

    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 4);
    }

    const blob = new Blob([data], { type: 'text/json' });
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  };
})(console);

console.save(jsonString);


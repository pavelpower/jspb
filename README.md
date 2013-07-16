jspb
====

parser pieces for assembly files



#Sample

```bash
node index.js -i ./tests/TPanel.js -r ./tests
```

#use in node

```javascript

 var FilesParser = require('./lib/FilesParser.js');

 // you can use many templates
 filesParser = new FilesParser([require('./templates/extjs4.js')]);

 // and
 // main.js - enter point
 // true - added in output list enter point (false - no)?
 // fn - callback after parse and create list
 filesParser.read('main.js', true, function() {
     var links = filesParser.getListLinks();

     console.log('links.length:', links.length);

     if (links) {
         links.forEach(function(link) {
             console.log('-----link--------');
             console.log('blank:', link.blank);
             console.log('path:', link.path);
             console.log('level:', link.level);
             console.log('error:', link.error);
         });
     } else {
         console.log('links is NULL:', links);
     }
 });

```
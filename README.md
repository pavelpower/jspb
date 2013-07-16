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

#LICENSE
The MIT License (MIT)

Copyright (c) 2013 Pavel Akhmetchanov

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

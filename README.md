jspb
====

The parser files to create a workpiece for the builder files.
Returns an one instance of the file path for the assembly.
And in the reverse order from the input graph.


#Sample

read and change file "settings.yml"
section "default_params"

```bash
jspb -d
```
or

```bash
cd ./jspb/index.js -d
```


#use in node

```javascript
 require('js-yaml');
 // you can read default setting from out file
 var settings = require('./settings.yml');

 var _params = settings.default_params;

 // _params.temps_read {Array}  sample: [ 'path_to_temp_read {String}', 'path_to_temp_read {String}', .. ]
 //  temp_read - the node module with fn getPath and fn getBlanks
 // _params.temp_write {String} string for output. sample for jossy: //#require:{path}
 // _params.file_path {String} path to file entry-point
 // _params.withPointFile - flag, include entry-point to output?

 require('jspb').parse(
    _params.temps_read,
    _params.temp_write,
    _params.file_path,
    function(result) {
     var links = this;

     if (!_params.debug) {
        console.log(result);
        return;
     }

     links.forEach(function(link) {
          console.log('-----link--------');
          console.log('blank:', link.blank);
          console.log('path:', link.path);
          console.log('level:', link.level);
          console.log('error:', link.error);
      });


 }, _params.withPointFile);

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

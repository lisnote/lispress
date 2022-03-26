For now it's just a string concatenation tool

# Example

```javascript
const lispress require("lispress");
lispress.config({username:"lisnote"});
let url lispress.getStaticUrl("test.md");
console.log(url);
// output : https://lisnote.github.io/test.md
```
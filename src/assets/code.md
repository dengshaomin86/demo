# code

```
// main.js
methods: {
  init() {
    this.getList();
  },
  getList() {
    this.list = this.$router.options.routes.map((item) => item.path);
  },
},
```

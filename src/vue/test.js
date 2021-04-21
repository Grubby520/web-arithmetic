function getData(data, vm) {
  return data.call(vm, vm);
}

const instance = {
  data() {
    const vm = this;
    return {
      a: 1,
      b: 2,
      obj: {
        c: function () {
          console.log(vm);
        },
      },
    };
  },
};

let data = instance.data;
data = getData(data, instance);
console.log(data);
console.log(data.obj.c());

//1 简单应用
let arr = [1, 2, 3, 4, 5]
console.log(arr.reduce((a, b) => a + b)) //15
console.log(arr.reduce((a, b) => a * b)) //120

//2. 计算数组中每个元素出现的次数
let arr2 = ['name', 'age', 'long', 'short', 'long', 'name', 'name']
let arrResult = arr2.reduce((pre, cur) => {
    console.log(pre, cur)
    if (cur in pre) {
        pre[cur]++
    } else {
        pre[cur] = 1
    }
    return pre
}, {})
console.log(arrResult) //结果：{name: 3, age: 1, long: 2, short: 1}


//3. 数组去重
let arrResult = arr.reduce((pre, cur) => {
    if (!pre.includes(cur)) {
        pre.push(cur)
    }
    return pre;
}, [])
console.log(arrResult) //结果：["name", "age", "long", "short"]

// 4. 对象属性求和
let person = [{
    name: 'xiaoming',
    age: 18
}, {
    name: 'xiaohong',
    age: 17
}, {
    name: 'xiaogang',
    age: 19
}]
let result = person.reduce((a, b) => {
    a = a + b.age;
    return a;
}, 0)
console.log(result) //结果：54

// 5.数组对象属性 根据指定属性去重
let newArr = [{
        name: "张三",
        form: "aaa"
    },
    {
        name: "小明",
        form: "bbb"
    },
    {
        name: "小王",
        form: "ccc"
    }, {
        name: "小李",
        form: "ddd"
    }, {
        name: "小刘",
        form: "eee"
    }, {
        name: "张三",
        form: "aaa"
    }
]
let orr = [];
let result = newArr.reduce((pre, cur) => {
    if (!orr.includes(cur.form)) {
        pre.push(cur)
        orr.push(cur.form)
    }
    return pre
}, []);


## weaher.app
1. 利用前端的基础来实现一个响应式的weather.app
2. 说是app，其实就是一个页面，很是简单，但是也是自己做的一个成型的东西
3. 闲暇时间开发，作为前端基础知识的练习

--EOF--

## First step

- [x] 页面设计
 
- [x] 基础HTML结构
 
- [x] 基础样式
 
- [x] 素材收集

## createWeatherCard方法

功能:

- 缓存section数组
- 定义插入模板
- 插入最后一个section后

实现:

主要在于模板插入到DOM书中的实现,实现过程学习了常用的插入方法,最后选定了`insertAdjacentHTML()`来实现,它需要两个参数,第一个是插入的位置,第二个是需要插入的对象,这里插入的对象不能是拼接好的节点,只能是字符串等形式,位置有4种:

> element.insetAdjacentHTML(position, text);

element是插入位置的参考位置。

1. beforebegin: element之前
2. afterbegin: element内,在它first-child之前
3. beforeend: element内,在它last-child之后
4. afterend: element元素本身之后

理所当然,`beforebegin`和`afterend`的插入必须是`element`本身存在于DOM书中,并且有父级元素的存在。

[refrence] (https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)





## 兼容性: Element.insertAdjacentHTML()

> ✔ 93.94% ◒ 1.37% **W3C Candidate Recommendation**
>	Inserts a string of HTML into a specified position in the DOM relative to the
>	given element. #JSAPI
>
>	IE ‽ 5.5+ ◒ 6+¹ ✔ 10+
>	Edge ✔ 
>	Firefox ✘ 2+ ✔ 8+
>	Chrome ✔ 
>	Safari ✘ 3.1+ ✔ 4+
>	Opera ‽ 9+ ✔ 10.0-10.1+
>
>		¹Throws an "Invalid target element for this operation." error [when called
>		on a table, tbody, thead, or tr
>		element.](http://ejohn.org/blog/dom-insertadjacenthtml/)



## TODO
- [x] 定义一个天气块函数
	
	- [x] 函数添加对空字符输入，查询后生成块的检查，没有输入字符会导致查询参数缺失

	1. js中只是没有调用函数,对用户友好度不够,需在前端提示"输入城市名字"
	2. 输入城市不符合规范的提示需提前到前端文案提示

- [x] 实现html的结构插入

- [ ] hover特效实现

- [ ] 城市列表并增加过滤[张鑫旭](http://www.zhangxinxu.com/wordpress/?p=3672)

- [ ] 动画定义

- [ ] D3.js引入

- [ ] 考虑数据是否重新组装

- [ ] 实现预测信息的走势

- [ ] 实现缓存的处理,避免同个城市的多次查询都发起请求

## 重构任务

- [ ] 原生实现Ajax
- [ ] 天气图标更新


## 存在问题

- 数据从请求到返回时间较长,平均需要1s

- 插入一个天气块,再次插入未更新DOM树

## d3笔记

### d3.scale.linear

定义坐标轴的梯度,通过`domain`和`range`实现定义,其中`range`限定可利用的范围,而`domain`定义最值。

### d3.svg.axis

定义坐标轴,就是画出坐标轴那条线,`d3.scale.linear`主要是坐标轴的属性定义


### d3's XHR

- d3.xhr(url[, mimeType][, callback])

- d3.json(url[, callback])

Creates a request for the JSON file at the specified url with the mime type "application/json". If a callback is specified, the request is immediately issued with the GET method, and the callback will be invoked asynchronously when the file is loaded or the request fails; the callback is invoked with two arguments: the error, if any, and the parsed JSON. The parsed JSON is undefined if an error occurs. If no callback is specified, the returned request can be issued using xhr.get or similar, and handled using xhr.on.

[教程地址](http://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js-part-2--cms-22973)


[d3-core API](https://github.com/d3/d3/wiki/Core)

###  d3.svg.line

```js
//定义了话数据曲线的方法
var lineGenerator = d3.svg.line()
  .x(function(d) {
	  return x_scale(d.dt);
  })
  .y(function(d) {
	  return y_scale(d.temp);
  })
  .interpolate('basis');
  ```
  lineGenerator接受的参数是一个数组,包含多个对象的数据集合。

### 问题

1 值的复制

简单数据类型的复制是值的复制，而复杂数据类型的复制是索引的复制

```js
var a = {
	name: "ivanberry"
};

b = a;

b.name === "ivanberry"; //true

b.name = "who";

a.name === "ivanberry"; //false
```

把`a`赋值给`b`并不是对值的复制，而是新建了一个链接到`a`的索引而已，它们指向同一个对象。修改其中任意一个值，都会影响另外一个！

2 [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

3 JSON.parse(JSON.stringify(jsondata));

4 [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

还是这个问题:

```js
var true_null = Object.create( null );

var chart_meta_data,data;

data.push(true_null, chart_meta_data);

data.push( {}, chart_meta_data);
```

为什么这里的`chart_meta_data`依然会被覆盖呢? 而第二种实现方法又不会?


### 字符转数字方法

将x转化为数字,当然x是对应的数字字符串

-  Numner(x)
-  parseInt(x, 10)
-  parseFloat(x)
-  +x
-  1*x





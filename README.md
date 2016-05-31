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

- 缓存sction数组
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

兼容性:



>	Element.insertAdjacentHTML() ✔ 93.94% ◒ 1.37% [W3C Candidate Recommendation]
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
- [x] 实现html的结构插入
 
- [ ] hover特效实现
 
- [ ] 实现预测信息的走势




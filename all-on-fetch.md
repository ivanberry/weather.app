
# All On Fetch

## 兼容性

>⚠  Caniuse data is more than 30 days out of date!
>   Consider updating: npm install -g caniuse-cmd
>
>Fetch ✔ 54.08% ◒ 0.24% [WHATWG Living Standard]
>  A modern replacement for XMLHttpRequest. #JSAPI
>
>  IE ✘ 
>  Edge ✘ 
>  Firefox ✘ 2+ ✘ 34+¹ ✔ 39+⁴ ✔ 40+
>  Chrome ✘ 4+ ◒ 40+² ◒ 41+² ✔ 42+
>  Safari ✘ 
>  Opera ✘ 9+ ◒ 27+² ◒ 28+² ✔ 29+
>
>    ¹Partial support can be enabled in Firefox with the `dom.fetch.enabled`
>    flag.
>    ²Only available in Chrome and Opera within ServiceWorkers.
>    ⁴Firefox <40 is not completely conforming to the specs and does not respect
>    the <base> tag for relative URIs in fetch requests.
>    https://bugzilla.mozilla.org/show_bug.cgi?id=1161625
    

## fetch

简单说明，它同XHR类似，和它最大的区别为fetch返回`Promise`，同时大大简化了语法和回调，完毕。

### 基础知识

通过比较XHR和fetch:请求一个URL，得到回复、JSON化。

1. XMLHttpRequest(XML)

每个XML需要两个监听处理函数分别处理请求的成功与失败，当然还有`open`和`send`方法：

```js
function reqListenner() {
    var data = JSON.parse(this.resposeText);
    console.log(data);
}


function reqError(err) {
    console.log('Fetch Error: -S', err)
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open('get', './data/data.json', true);
oReq.send(null);

```

2. Fetch

```js

fetch('./data/data.json')
    .then(

        function(response) {
        if(response.status != 200) {
        console.log('Looks like some errors. Status code' + response.status);
        return;
            }


        //Examine the text in the response
        response.json().then(function(data) {
            console.log(response);
            console.log(data);
            });
        }

    )

    .catch(function(err) {
        console.log('Fetch Error: -S', err);
        });

```

3. 响应都有哪些元数据呢？

其实通过控制台打印下`response`就知道了，基本上响应*Header*里的各种信息都可以访问到的。当然还有响应的`status`,`statusText`,`type`,`url`等等。

响应类别：`basic`,`cors`,`opaque`，这些值表明请求和响应的源是否一致，当同源时就是`basic`啦，非同源的就是`cors`啦，而`opaque`是非同源下并且没有返回`cors`的情况，这种情况下，我们不能访问响应头的一些信息，也就是说并不能知道响应是否成功。

4. 链式

利用fetch，我们可以将逻辑全部写到一起，实现很好的封装：

```js
function status(response) {
    if(respose.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
 } else {
    return Promise.reject(new Error(response.statusText));
 }

}


function json(response) {
    return response.json();
}

fetch('data.json')
    .then(status)
    .then(json)
    .then(function(data) {
        console.log("balabalabala", data);
    }).catch(function(error){
        console.log('balabalabala', error);
    });
```


定义`status`函数，不同状态返回`resolved`或者`rejected`的Promise对象，假如返回`resolver`对象，链式执行`json`函数。如果返回`rejected`对象，意味着请求被拒绝哒！那么就执行`catch`函数罗。

### POST

请求需要包含参数是一件很正常的事情，`fetch`当然也得支持罗。通过配置*method*和*body*来实现传参数：


```js
fetch(url, {
    method: 'post',
    header: {
        'Content-type': 'application/x-www-form-rurlencoded; charset=UTF-8'
    },
    body: 'foo=bar&lorem=ipsum'
})
.then(json)
.then(function(data) {
    console.log('Requset succeeded with JSON response', data);
})
.catch(function(error) {
    console.log('Request failed', error)
});
```

现在支持度不够，这时候[Github](https://github.com/github/fetch)来帮忙罗。

## 总结

简单学习后，以后再正式入坑的时候，慢慢填，慢慢填！







































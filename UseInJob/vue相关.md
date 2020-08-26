# vue项目中遇到的问题
 ## 使用 vue-router，页面加载完成后，$route 的值不正确
 ### 原因： 在 mounted 中，router 的初始化还没有完成，所以取到的是一个初始默认值。
 ### 解决方法： 用 onReady
 
 ```
 mounted(){	
	this.$router.onReady(() => {
		if (this.$route.matched.length === 0) {
			this.$router.push("/index");
		}
	});
}

```
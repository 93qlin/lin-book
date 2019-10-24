## 语法：
pointer-events：auto| none | visiblepainted | visiblefill | visiblestroke | visible | painted | fill | stroke | all
## 重点 none 属性，因为其他值除了auto只能用于svgs上。
## 作用：
1. 鼠标事件失效，
2. 让元素实体 “虚化”。

### 鼠标事件失效，
点不了的，并且 hover 也没有效果。（值得一提的是，仅仅是鼠标事件失效，用 tab 键还是可以选中该链接的，然后 enter 打开，这个时候可以去掉 a 标签的 href 属性，就不能让 tab 键选中了）
```
<a href="http://sf.gg" style="pointer-events: none">click me</a>
```
### 让元素实体 “虚化”。
假如弹幕层用了 canvas 构造，canvas 下面的内容其实是被 canvas 遮住了，无法点击。所以我们给 canvas 加上 pointer-events: none，真正在下面的内容就可以被点击了。
<!--
 * @Author: qin lin 925697386@qq.com
 * @Date: 2020-08-18 20:57:42
 * @LastEditors: qin lin 925697386@qq.com
 * @LastEditTime: 2022-09-02 21:31:06
 * @FilePath: /lin-book/CssAndHtml/Css/冷门css.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## HTML5的标签meter

- 作用：定义已知范围或分数值内的标量测量。
- 说明： 标签不应用于指示进度（在进度条中）。如果标记进度条，请使用 标签。
- 注释： 标签是 HTML 5 中的新标签。
```
<p>显示度量值：</p>
<meter value="3" min="0" max="10">3/10</meter><br>
<meter value="0.6">60%</meter>
<p><b>注释：</b>Internet Explorer 不支持 meter 标签。</p>
```
## HTML5的标签make
### 需要突出显示文本时使用
```
<p><mark>西门大官人</mark>是PHP中文网的<mark>高级讲师</mark></p>
```
等同于
```
mark {
    background-color: yellow;
    color: black;
}
```
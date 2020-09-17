## 简写
使用 React Fragments 来组合各个组件，为了语义化的 HTML 不会被破坏。
```
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```
当你不需要在 fragment 标签中添加任何 prop 且你的工具支持的时候，你可以使用 短语法：
```
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

## 关闭弹窗
window 对象中附上一个 click 事件以关闭弹窗：
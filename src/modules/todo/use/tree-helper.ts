import { ToDoItem } from '../interface';

/**
 * 将扁平的任务数组转换为树形结构
 * 前提：任务已经根据 parentId 建立了关联，且没有循环引用
 */
export const buildTree = (items: ToDoItem[]): ToDoItem[] => {
  const map = new Map<string, ToDoItem>();
  const roots: ToDoItem[] = [];

  // 1. 预处理：清空所有 items 的 children，防止旧数据残留
  items.forEach(item => {
    item.children = [];
    map.set(item.id, item);
  });

  // 2. 组装树
  items.forEach(item => {
    if (item.parentId && map.has(item.parentId)) {
      const parent = map.get(item.parentId);
      parent!.children.push(item);
      // 兼容旧的 indent 逻辑（可选，如果完全依赖 parentId 可移除）
      item.indent = (parent!.indent || 0) + 1;
    } else {
      // 没有 parentId 或者 parentId 找不到的都作为根节点
      roots.push(item);
      item.indent = 0; 
    }
  });

  // 3. 排序 (如果有 sortOrder)
  const sortFn = (a: ToDoItem, b: ToDoItem) => (b.sortOrder || 0) - (a.sortOrder || 0); // 假设 sortOrder 大的在前面，或者根据创建时间
  const recursiveSort = (nodes: ToDoItem[]) => {
    nodes.sort(sortFn);
    nodes.forEach(n => recursiveSort(n.children));
  };
  
  // 如果使用了 sortOrder，取消注释下面这行
  // recursiveSort(roots);

  return roots;
}

/**
 * 将树形结构扁平化（用于发送给只接受扁平结构的后端接口，或者调试）
 */
export const flattenTree = (roots: ToDoItem[]): ToDoItem[] => {
  const result: ToDoItem[] = [];
  const traverse = (nodes: ToDoItem[]) => {
    nodes.forEach(node => {
      result.push(node);
      if (node.children.length > 0) {
        traverse(node.children);
      }
    });
  };
  traverse(roots);
  return result;
}



export const convertTree = (data: API.TreeLong[]): any[] => {
    return data.map((item: API.TreeLong) => ({
      title: item.label,
      value: item.id,
      key: item.id,
      children: item.children ? convertTree(item.children) : [],
    }));
  };
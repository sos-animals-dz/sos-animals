const reverse = (list: any) => {
  const ret = [];
  for (let i = list.length - 1; i >= 0; i -= 1) {
    ret.push(list[i]);
  }
  return ret;
};

export default reverse;

export default function deleteByValue(arr: any, key: string, val: string) {
  const newObj = { ...arr };

  for (var item in newObj) {
    if (newObj[item][key] === val) {
      delete newObj[item];
    }
  }

  return newObj;
}

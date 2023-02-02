// remove undefined value fields, causing firestore error
const removeEmpty = (obj: any) => {
  let newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};

export default removeEmpty;

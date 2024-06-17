const keysToFix = ["layers", "shapes"];

// Function to recursively fix specified arrays by removing null values
export default function fixLayerArrays<T extends Record<string, any>>(
  obj: T,
): T {
  const removeNulls = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.filter((item) => item !== null).map(removeNulls);
    } else if (obj && typeof obj === "object") {
      const newObj: any = { ...obj };
      for (const key in newObj) {
        if (keysToFix.includes(key) && Array.isArray(newObj[key])) {
          newObj[key] = newObj[key]
            .filter((item: any) => item !== null)
            .map(removeNulls);
        } else if (newObj[key] && typeof newObj[key] === "object") {
          newObj[key] = removeNulls(newObj[key]);
        }
      }
      return newObj;
    }
    return obj;
  };

  return removeNulls(obj);
}

export async function parseJsonFile(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    };
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
}

import { existsSync, readdirSync, lstatSync } from 'fs';
export default (async rootDir => {
  const functionsDir = `${rootDir}/build/functions`;
  const rootArray = readdirSync(functionsDir);
  if (rootArray.length <= 0) throw new Error('Invalid root path');
  let manifestArray = [];
  let i;

  for (i = 0; i < rootArray.length; i++) {
    const functionRoot = `${functionsDir}/${rootArray[i]}`; // console.log(`iteration: ${i}, root: ${functionRoot}`)

    if (lstatSync(functionRoot).isDirectory()) {
      if (existsSync(`${functionRoot}/index.mjs`)) {
        manifestArray.push(rootArray[i]); // console.log(`${rootArray[i]} added to manifest`)
      }
    }
  }

  return manifestArray;
});
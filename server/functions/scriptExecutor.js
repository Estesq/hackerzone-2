const spawnSync = require('child_process').spawnSync;

const scriptExecutor = (language, scriptPath, inputs) => {
  var result = {}
  const scriptExecution = spawnSync(language, [scriptPath], { input: inputs });
  let err = scriptExecution.stderr.toString()
  let msg = scriptExecution.stdout.toString().trim()
  
  if (err != '') result = { ...result, error: err }
  if (msg != '') result = { ...result, message: msg }
  return result
}
module.exports = scriptExecutor
const fs = require('fs')

function writeFile (req) {
  const dataFileName = `./data-db/users_tasks/${req.session.login.email}.json`
  const dataTasks = {'tasks': req.session.tasks, 'completed': req.session.completed}
  fs.writeFile(dataFileName, JSON.stringify(dataTasks), 'utf-8')
}

module.exports = writeFile

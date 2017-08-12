const path = require('path')
const writeFile = require(path.join(process.cwd(), './helpers/writeFile'))

function editTask (req, res) {
  const newName = req.body.name
  const editedID = req.body.ID

  for (let i = 0; i < req.session.tasks.length; i++) {
    if (req.session.tasks[i].ID === editedID) {
      req.session.tasks[i].name = newName
    }
  }
  writeFile(req)
  res.status(200).send('ok edit done')
}

module.exports = editTask

const LoginModel = require('./model/login')
const DepartmentModel = require('./model/department')
 
 // Insert or update function for any model
// eg: data => [{}] or {}
 insertOrUpdate = async (Model, data) => {
    const firstData = data[1] ? data[1] : data;
    const insertQuery = await Model.query().insert(data).toString()
    const onConflict = await Object.getOwnPropertyNames(firstData).map(c => c === Model.idColumn ? ',' : `${c} = VALUES(${c})`).join(',').replace(',,', '')
    const que = await `${insertQuery} ON DUPLICATE KEY UPDATE ${onConflict}`
    console.log('que in  insertOrUpdate', que.toString())
    return Model.raw(que);
  }



module.exports = {insertOrUpdate}
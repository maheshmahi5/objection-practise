const LoginModel = require('./model/login')
const DepartmentModel = require('./model/department')
const {raw} = require('objection');
const commonfunction = require('./commonfunctions')

const configRoutes = [

    // get method for username
    {
        method: 'POST',
        path: '/api/login/items',
        handler: async (request, h) => {
            let  items = request.payload;
            console.log(items);
            let data;
            try {
                console.log( LoginModel.query().select('login.id').where({Username:items.Username,password:raw(`md5('${items.password}')`)}).toString());
 
                // var data= await knex.raw(`select id from login where Username='${items.Username}' and password= md5('${items.password}')`)

                data = await LoginModel.query().
                select('login.id').where({Username:items.Username,password:raw(`md5('${items.password}')`)})
            } catch (error) {
                console.log(error, "error");
            }
            return data;
        }
    },
    // post method for dept table for delete func
    {
        method: 'POST',
        path: '/api/dept/del',
        handler: async (req, h) => {
            var departmentid= req.payload;
            console.log(departmentid)

            let data;
            try {
                console.log( DepartmentModel.query().update({ del: '0' }).where('dept_id', departmentid).toString());

                data = awaitDepartmentModel.query().update({ del: '0' }).where('dept_id', departmentid)

            } 
            catch (error) {
                console.log(error, "error");

            }

            return data;
        }
    },
    // post method for login table for delete func
    {
        method: 'POST',
        path: '/api/login/del',
        handler: async (req, h) => {
            var loginid = req.payload;
            console.log(loginid)

            let data;
            try {
                console.log( LoginModel.query().update({ del: '0' }).where('id', loginid).toString());

                data = await LoginModel.query().update({ del: '0' }).where('id', loginid)

            } catch (error) {
                console.log(error, "error");

            }
            
            return data;
        }
    },
    // get method for deptartment list
    {
        method: 'GET',
        path: '/api/dept',
        handler: async (req, h) => {
            console.log("payload", req.payload);

            let data;
            try {
                console.log( DepartmentModel.query().
                select('departments.dept_id','departments.dept_name','departments.status',raw('GROUP_CONCAT(login.emp_id ) as employee'))
                .leftJoin('login','departments.dept_id','login.dept_id')
                .where('departments.del','=',1 )
                .groupBy('departments.dept_id')
                .orderBy('departments.dept_id').toString());

                
                data = await DepartmentModel.query().
                select('departments.dept_id','departments.dept_name','departments.status',raw('GROUP_CONCAT(login.emp_id ) as employee'))
                .leftJoin('login','departments.dept_id','login.dept_id')
                .where('departments.del','=',1 )
                .groupBy('departments.dept_id')
                .orderBy('departments.dept_id')
            } catch (error) {
                console.log(error, "error");

            }
            // var data = await knex.raw(`SELECT departments.dept_id,departments.dept_name,departments.status,GROUP_CONCAT(login.emp_id ) as employee FROM departments left join login ON departments.dept_id=login.dept_id where departments.del=1 GROUP BY (departments.dept_id) ORDER by (departments.dept_id)`)
            return data;
        }
    },


    //get method for login table
    {
        method: 'GET',
        path: '/logintabl',
        handler: async (req, h) => {
            // var i = req.payload;
            // console.log(i)
            let data;
            try {
                console.log(LoginModel.query()
                .select('login.*', raw('date_format(DOB, "%Y-%m-%d") as dob')).where('del',1).toString());

                   data = await LoginModel.query()
                   .select('login.*', raw('date_format(DOB, "%Y-%m-%d") as dob')).where('del', '=', 1)
            }catch(error) {
                console.log(error,"error");
            }
          
            return data;
        }
    },
    // get method for login table for edit and view func

    
    {
        method: 'GET',
        path: '/login/{id}',
        handler: async (req, h) => {
            let  loginid = req.params.id;
            let data;
            console.log(loginid)
            try {
                console.log(LoginModel.query()
                .select('login.*', raw('date_format(DOB, "%Y-%m-%d") as dob')).where('id', '=', loginid).toString());
                
                data = await LoginModel.query()
                .select('login.*', raw('date_format(DOB, "%Y-%m-%d") as dob')).where('id', '=', loginid)

            } catch (error) {
                console.log(error, "error");

            }

            return data;
        }
    },

    // get method for dept table for edit  func
    {
        method: 'GET',
        path: '/api/depts/{id}',
        handler: async (req, h) => {
            var departmentid = req.params.id;
            console.log(id)
            let data;
            try {
                console.log( DepartmentModel.query().where('dept_id',departmentid ).toString());
                
                data = await DepartmentModel.query().where('dept_id', departmentid)

            } catch (error) {
                console.log(error, "error");

            }
            return data;

        }
    },

    // post method for dept table for update func
    {
        method: 'POST',
        path: '/api/dept/{id}',
        handler: async (req, h) => {
            let  department = req.payload;
            let id = req.params.id;
            console.log(id)

            let data;
            try {
                console.log(DepartmentModel.query().
                update({ dept_name: department.dept_name, status: department.status }).where('dept_id', id).toString());
                
                data =  await DepartmentModel.query().
                update({ dept_name: department.dept_name, status: department.status }).where('dept_id', id)

            } catch (error) {
                console.log(error, "error");

            }
            return data;
        }
    },


    // post method for login table for update func
    {
        method: 'POST',
        path: '/api/login/upd/{id}',
        handler: async (req, h) => {
            let login = req.payload
            let loginid = req.params.id;
            console.log(i);

            let data;
            try {
                console.log(LoginModel.query().
                update({
                    Username: login.Username, First_name: login.First_name, Last_name: login.Last_name,
                    DOB: login.myDate.formatted, phone_no: login.phone_no, dept_id: login.dept_id, status: login.status
                }).
                where('id', loginid).toString());
                


                data =  await LoginModel.query().
                update({
                    Username: login.Username, First_name: login.First_name, Last_name: login.Last_name,
                    DOB: login.myDate.formatted, phone_no: login.phone_no, dept_id: login.dept_id, status: login.status
                }).
                where('id', loginid)

            } catch (error) {
                console.log(error, "error");

            }

            return data[0]

        }
    },

    // post method for login table for insert func
    {
        method: 'POST',
        path: '/api/login',
        handler: async (req, h) => {
            var login = req.payload
            console.log(login)

            let data;
            try {
                console.log(LoginModel.query().
                insert({
                    Username: login.Username, First_name: login.First_name, Last_name: login.Last_name,
                    // DOB: login.myDate.formatted,
                     phone_no: login.phone_no, password: raw(`md5(${login.password})`),
                    //   dept_id: login.dept_id, joining_date: login.joinDate.formatted
                }).toString());
                
                data =  await LoginModel.query().
                insert({
                    Username: login.Username, First_name: login.First_name, Last_name: login.Last_name,
                    phone_no: login.phone_no, password: raw (`md5(${login.password})`)
                })
            } catch (error) {
                console.log(error, "error");

            }

            return data;
        }
    },

    // post method for dept table for insert func
    {
        method: 'POST',
        path: '/dept/insert',
        handler: async (req, h) => {
            let  department = req.payload
            console.log(department)

            let data;
            try {
                console.log( DepartmentModel.query().insert({ dept_name: department.dept_name, status: department.status }).toString());
                
                data = await DepartmentModel.query().insert({ dept_name: department.dept_name, status: department.status })

            } catch (error) {
                console.log(error, "error");

            }
            return data[0];
        }
    },
  

    // get method for roles for multiselect
    {
        method: 'GET',
        path: '/role/{data}',
        handler: async (req, h) => {
            var data = req.params.data;
            console.log(data)

            let data1;
            try {
                console.log()

              data1 = await LoginModel.query().select('login.emp_id','login.Username','login.role').where(raw(`FIND_IN_SET('${data}',role)` ) )

            // var data = await knex.raw(`SELECT emp_id , Username, role FROM login where FIND_IN_SET('${data}',role) `)

            } catch(error){
                console.log(error,'error')
            }
           
            return data
        }
    },



    //postmethod for role update method
    {
        method: 'POST',
        path: '/api/role/update',
        handler: async (req, h) => {
            let  roleupdateorinsertdata = req.payload;
            console.log( roleupdateorinsertdata)
            let data
            try{
               data= await commonfunction.insertOrUpdate(LoginModel, roleupdateorinsertdata)
    
            }catch(error){
                console.log(error,'error')
            }

    
            return 'success'
        }
    }


];
module.exports = configRoutes
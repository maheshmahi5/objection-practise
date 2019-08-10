const { Model } = require('objection');

class login extends Model {
     
    static get tableName() {
        return 'login';
    }

    static get idColumn() {
        return 'id';
    }

    
  static get jsonSchema() {
    return {
        type: 'object',
        required: [],

        properties: {

            First_name: {type:'string'},
            Last_name: {type:'string'},
            DOB:{type:'date'},
            password:{type:'string'},
            phone_no: { type: 'integer' },
            dept_id: {type:'integer'},
            Username: {type:'string'},
            joining_date:{type:'string'}


            // Properties defined as objects or arrays are
            // automatically converted to JSON strings when
            // writing to database and back to objects and arrays
            // when reading from database. To override this
            // behaviour, you can override the
            // Model.jsonAttributes property.
        }
    };
}

}
module.exports=login
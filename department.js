const { Model } = require('objection');

class department extends Model {
     
    static get tableName() {
        return 'departments';
    }

    static get idColumn() {
        return 'dept_id';
    }

    
  static get jsonSchema() {
    return {
        type: 'object',
        required: [],

        properties: {

            dept_name:{type:'string'},
            status: { type: 'integer' },
           

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
module.exports=department;
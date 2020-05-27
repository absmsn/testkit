exports.up = function (knex) {
    return knex.schema.createTable('user', (table) => {
        table.string('userID', 36)
            .notNullable().primary()
            .index().unique()
        table.string('userName', 255).unique()
        table.string('email', 255).unique()
        table.string('hashPassword', 128)
        table.string('salt', 40)
        table.string('selfDescription', 255).defaultTo('')
        table.timestamp('signupTime')
    })
}

exports.down = function(knex){
    return knex.schema.dropTableIfExists("user")
}
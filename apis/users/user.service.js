const pool = require('../../config/db');



module.exports = {
	create: (data, callback) => {
		pool.query(
			`insert into registration(firstName, lastName, gender,	email, 	password, number)
			values(?,?,?,?,?,?)`,
			[
				data.firstName,
				data.lastName,
				data.gender,
				data.email,
				data.password,
				data.number
			],
			(err, result) => {
				if(err){
					callback(err)
				}
				return callback(null, result)
			}
			)
	},

	getUsers: callback => {
		pool.query(
			`select id, firstName, lastName, gender, email, number from registration`,
			[],
			(err, result) =>{
				if(err){
					callback(err);
				}
				return callback(null, result);
			}
			)
	},

	getUserByUserId: (id, callback) =>{
		pool.query(
			`select id,firstName,lastName,gender,email,number from registration where id = ?`,
			[id],
			(err, result) => {
				if(err){
					 callback(err);
				}
				return callback(null, result[0]);
			}
			)
	},

	updatedUser: (id, data, callback) =>{
		pool.query(
			`update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=?`,
			[
			data.firstName,
			data.lastName,
			data.gender,
			data.email,
			data.password,
			data.number,
			data.id
			],
			(err, result) =>{
				if(err){
					callback(err);
				}
				if(!result){
					return res.json({
						suceess:0,
						message: 'Failed to update'
					})
				}
				return callback(null, result)
			}
			)
	},

	deleteUser: (id, data,  callback) =>{
		pool.query(
			`delete from registration where id = ?`,
			[data.id],
			(err, result) =>{
				if(err){
				return	callback(err);
				}
				return callback(null, result)
			}
			)
	},

	getUsersByEmail: (email, callback) =>{
		pool.query(
			`select * from registration where email = ?`,
			[email],
			(err, result) =>{
				if(err){
					callback(err)
				}
				return callback(null, result[0])
			}
			)
	}
}
const {
	create,
	getUsers,
	getUserByUserId,
	updatedUser,
	deleteUser,
	getUsersByEmail

} = require('./user.service');
const {genSaltSync, hashSync, compareSync  } = require('bcrypt');
const bycrypt =  require('bcrypt');
const {sign} = require('jsonwebtoken');


	
module.exports = {
	createUsers: (req, res) =>{
		const body = req.body;
		const salt = genSaltSync(10);
		body.password = hashSync(body.password, salt);
		create(body, (err, result) => {
			if(err){
				console.log(err);
				return res.status(500).json({
					success:0,
					message:'database Connection Error'
				})
			}
			return res.status(200).json({
				success:1,
				data: result
			})
		})
	},

	getUserByUserId: (req, res) =>{
		const id = req.params.id;

		getUserByUserId(id, (err, result) => {
			
			if(err){
				console.log(err);
				return;
			}
			if(!result){
				return res.json({
					success:0,
					message: 'Record Not Found'
				})
			}
			return res.json({
				success:1,
				data: result
			})
		})
	},

	getUsers: (req, res) =>{
		getUsers((err, result) => {
			if(err){
				console.log(err);
				return;
			}
			return res.json({
				success:1,
				data:result
			})
		})
	},

	updatedUser: (req, res) =>{
		const body = req.body;
		const id = req.params.id;
		const salt = genSaltSync(10);
		body.password = hashSync(body.password, salt);
		updatedUser(id, body, (err, result) =>{
			if(err){
				console.log(err);
				return;
			}
			return res.json({
				success:1,
				message: 'Update Successfully'
			})
		})
	},

	deleteUser: (req, res) =>{
		const body = req.body;
		const id = req.params.id;

		deleteUser(id, body, (err, result) => {

			if(err){
				console.log(err);
				return;
			}
			if(!result){
				return res.json({
					success: 0,
					message: 'Record Not Found'
				});
			}
			return res.json({
				success: 1,
				message: 'Delete Successfully'
			})
		})
	},

 login: (req, res) => {
    const body = req.body;
  	const salt = genSaltSync(10);
	
		
    getUsersByEmail(body.email, (err, result) => {
    	
      if (err) {
        console.log(err);
      }
      if (!result) {
        return res.json({
          success: 0,
          data: "Invalid email or password or"
        });
      }
      // const match =  compareSync(body.password, result.password);
   	 const resultC = bycrypt.compare(body.password, result.password);
			// res.json(resultC);
      if (resultC) {
        result.password = undefined;
        const jsontoken = sign({ resultC: result }, "qwe1234", {
           expiresIn: '1h' 
        });
        // res.json(jsontoken);
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password salt"
        });
      }
    });
  }

}
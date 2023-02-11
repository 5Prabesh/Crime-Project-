const { users, admins } = require("../models");
const { uploadFileToPath } = require("../helpers/fileHelper");
const _ = require('lodash');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

let authController = {
    registerUser: async(req, res) => {
        try {
                
                let userData = {
                    'firstName': req.body.firstname ? req.body.firstname : null,
                    'lastName': req.body.lastname ? req.body.lastname: null,
                    'username': req.body.username ? req.body.username: null,
                    'email': req.body.email ? req.body.email: null,
                    'phoneNumber': req.body.phone_number? req.body.phone_number: null,
                    'location': req.body.location? req.body.location: null,
                    'password': req.body.password,
                    'documentType': req.body.document_type? req.body.document_type: null,
                };

                if (req.files && req.files.image) {
                    userData['image'] = uploadFileToPath({
                        file: req.files.image,
                        absDir: "/uploads/users/",
                        rootDir: "public/backend"
                    });    
                }

                if (req.files && req.files.document_image) {
                    userData['documentImage'] = uploadFileToPath({
                        file: req.files.document_image,
                        absDir: "/uploads/users/",
                        rootDir: "public/backend"
                    });    
                }

                await users.create(userData);

                return res.status(200).send({"msg": "Successfully registered"});
        } catch(err) {
            return  res.status(422).send({"msg": "Something went wrong"});
        }
    },

    loginUser: async(req, res) => {

        try {   
                let user = await users.findOne({
                    where: Sequelize.where(
                        Sequelize.fn('lower', Sequelize.col('email')),
                        Sequelize.fn('lower', req.body.email)
                    )
                });
                if (_.isEmpty(user)) {
                    return  res.status(403).send({ "msg": "Username password incorrect"});
                }

                if (! await bcrypt.compare(req.body.password, user.password)) {

                    return res.status(401).send({"msg": "Invalid password"});

                }
                if (user) {
                    let data = {
                        "user_id": user.id
                    }
                    return res.status(200).send({"data": data,"msg": "Successfully logged in"});
                
                }else {
                    return res.status(401).send({"msg": "Invalid credentials"});
                }
        } catch (e) {
            return  res.status(422).send({ "msg": "Something went wrong"});
        }

    },

    loginAdmin: async(req, res) => {

        try {   
                let admin = await admins.findOne({
                    where: Sequelize.where(
                        Sequelize.fn('lower', Sequelize.col('email')),
                        Sequelize.fn('lower', req.body.email)
                    )
                });
                if (_.isEmpty(admin)) {
                    return  res.status(403).send({ "msg": "Username password incorrect"});
                }

                if (! await bcrypt.compare(req.body.password, admin.password)) {

                    return res.status(401).send({"msg": "Invalid password"});

                }
                if (admin) {
                    return res.status(200).send({"msg": "Successfully logged in"});
                
                }else {
                    return res.status(401).send({"msg": "Invalid credentials"});
                }
        } catch (e) {
            return  res.status(422).send({ "msg": "Something went wrong"});
        }

    }

}

module.exports = authController;
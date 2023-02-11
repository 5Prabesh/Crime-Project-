const { reports, users, categories } = require("../models");

let reportController = {
    postReport: async (req,res) => {
        try{
            let reportData = {
                userId : req.body.user_id ? req.body.user_id : null,
                categoryId: req.body.category_id,
                fullName: req.body.fullname ? req.body.fullname :null,
                phoneNumber: req.body.phone_number ? req.body.phone_number : null,
                email: req.body.email,
                crimeSpot: req.body.crime_spot ? req.body.crime_spot : null,
                street: req.body.street ? req.body.street : null,
                postalCode: req.body.postal_code ? req.body.postal_code : null,
                city: req.body.city ? req.body.city : null,
                description: req.body.description ? req.body.description : null,
                status: 'pending',
            }

            if (req.files && req.files.evidence) {
                reportData['evidence'] = uploadFileToPath({
                    file: req.files.evidence,
                    absDir: "/uploads/reports/",
                    rootDir: "public/backend"
                });    
            }

            await reports.create(reportData);

            return res.status(200).send({"msg": "Successfully reported"});

        } catch (e) {
            console.log(e);
            return  res.status(422).send({"msg": "Something went wrong"});
        }
    },

    allReport: async (req,res) => {
        try {
            let reportDatas = await reports.findAll({ where: {}, include: [{model: categories}] });
            if(reportDatas.length != 0){
                let data = [];
                reportDatas.forEach(report => {
                    let returnData = {
                        'id': report.id,
                        'user_id': report.userId ? report.userId : null,
                        'crime_type': report.category ? report.category.title ? report.category.title : null : null,
                        'fullname': report.fullName ? report.fullName : null,
                        'email': report.email ? report.email : null,
                        'phone_number': report.phoneNumber ? report.phoneNumber : null,
                        'status': report.status ? report.status : null,
                    }
                    data.push(returnData);
                })
                return res.status(200).send({"data": data,"msg": "Successfully fetched"});
            }else{
                return  res.status(404).send({"msg": "No data available"});
            }
        } catch (e) {
            console.log(e);
            return  res.status(422).send({"msg": "Something went wrong"}); 
        }
    },

    allUserReport: async (req,res) => {
        try {
            let reportDatas = await reports.findAll({ where: {userId: req.params.id}});
            if(reportDatas.length != 0){
                let data = [];
                reportDatas.forEach(report => {
                    let returnData = {
                        'description': report.description ? report.description : null,
                        'status': report.status ? report.status : null,
                    }
                    data.push(returnData);
                })
                return res.status(200).send({"data": data,"msg": "Successfully fetched"});
            }else{
                return  res.status(404).send({"msg": "No data available"});
            }
        } catch (e) {
            console.log(e);
            return  res.status(422).send({"msg": "Something went wrong"}); 
        }
    },

    reportDetail: async(req,res) => {
        try {
            let report = await reports.findOne({where: {id: req.params.id}, include: [{model: categories}]});
            if(report){
                let returnData = {
                    'user_id': report.userId ? report.userId : null,
                    'crime_type': report.category ? report.category.title ? report.category.title : null : null,
                    'fullname': report.fullName ? report.fullName : null,
                    'email': report.email ? report.email : null,
                    'phone_number': report.phoneNumber ? report.phoneNumber : null,
                    'crime_spot': report.crimeSpot ? report.crimeSpot : null,
                    'street': report.street ? report.street : null,
                    'postal_code': report.postalCode ? report.postalCode : null,
                    'city': report.city ? report.city : null,
                    'description': report.description ? report.description : null,
                    'status': report.status ? report.status : null,
                    'remarks': report.remarks ? report.remarks : null,
                    'evidence': report.evidence ? report.evidence : null
                }
                return res.status(200).send({"data": returnData,"msg": "Successfully fetched"});
            }else {
                return  res.status(404).send({"msg": "No data available"});
            }
        } catch (e) {
            console.log(e);
            return  res.status(422).send({"msg": "Something went wrong"}); 
        }
    },

    accept: async(req,res) => {
        try {
            let updateData = {
                "status": 'accepted',
                "remarks": null
            }
            await reports.update(updateData, {where: {id: req.params.id}});
            return res.status(200).send({"msg": "Successfully updated"});
        } catch (e) {
            console.log(e);
            return  res.status(422).send({"msg": "Something went wrong"}); 
        }
    },

    reject: async(req,res) => {
        try {
            let updateData = {
                "status": 'rejected',
                "remarks": req.body.remarks ? req.body.remarks : null
            }
            await reports.update(updateData, {where: {id: req.params.id}});
            return res.status(200).send({"msg": "Successfully updated"});
        } catch (e) {
            console.log(e);
            return  res.status(422).send({"msg": "Something went wrong"}); 
        }
    }
}

module.exports = reportController;
const { caseInformations } = require('../models');

let caseInformationController = {
    postCaseInformation: async (req,res) => {
        try{
            let caseInformationData = {
                title : req.body.title ? req.body.title : null,
                description : req.body.description ? req.body.description : null
            }

            await caseInformations.create(caseInformationData);

            return res.status(200).send({"msg": "Successfully added"});

        } catch (e) {
            console.log(e);
            return  res.status(422).send({"msg": "Something went wrong"});
        }
    },

    allCaseInformation: async (req,res) => {
        try {
            let caseInformationDatas = await caseInformations.findAll({ where: {} });
            if(caseInformationDatas.length != 0){
                let data = [];
                caseInformationDatas.forEach(caseInformation => {
                    let returnData = {
                        'id': caseInformation.id,
                        'title': caseInformation.title ? caseInformation.title : null,
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

    caseInformationDetail: async(req,res) => {
        try {
            let caseInformation = await caseInformations.findOne({where: {id: req.params.id}});
            if(caseInformation){
                let returnData = {
                    'title': caseInformation.title ? caseInformation.title : null,
                    'description': caseInformation.description ? caseInformation.description : null
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

    deleteCaseInformation: async(req,res) => {
        try { 
            await caseInformations.destroy({where: {id: req.params.id}});
            return res.status(200).send({"msg": "Successfully deleted"});
        } catch (e) {
            console.log(e);
            return  res.status(422).send({"msg": "Something went wrong"}); 
        }
    }

}

module.exports = caseInformationController;
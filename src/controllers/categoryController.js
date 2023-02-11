const { categories } = require("../models");

let categoryController = {
    postCategory: async (req,res) => {
        try{
            let categoryData = {
                title: req.body.title ? req.body.title : null
            }

            await categories.create(categoryData);

            return res.status(200).send({"msg": "Successfully added"});

        } catch (e) {
            console.log(e);
            return  res.status(422).send({"msg": "Something went wrong"});
        }
    },

    allCategory: async (req,res) => {
        try {
            let categoryDatas = await categories.findAll({ where: {}});
            if(categoryDatas.length != 0){
                let data = [];
                categoryDatas.forEach(category => {
                    let returnData = {
                        'id': category.id,
                        'title': category.title ? category.title : null,
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
    }
}

module.exports = categoryController;
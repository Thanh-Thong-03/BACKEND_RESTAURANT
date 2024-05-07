const Cat = require('../models/cat.model')

const catService = {
    async createCat(cat) {
        const newCat = await Cat.create(cat);
        return newCat;
    },

    async getAllCats(){
        const cats = await Cat.findAll({ where: { is_deleted: false }});
        return cats;
    },

    // async findCatByName(name) {
    //     const cats = await Cat.find({ cat_name: name });
    //     return cats;
    // },

    async updateCat(catId, updateCatData){
        const catToUpdate = await Cat.findByPk(catId)

        if(!catToUpdate){
            throw new Error('Cat không tồn tại') 
        } else{
            await catToUpdate.update(updateCatData)
            return catToUpdate;
        }
    },

    async getCatId(catId) {
        const cat = await Cat.findByPk(catId);
        return cat;
    },

    async deleteCat(catId) {
        await Cat.update(
            { is_deleted: true },
            { where: { cat_id: catId } }
        );
    },
}

module.exports = catService;
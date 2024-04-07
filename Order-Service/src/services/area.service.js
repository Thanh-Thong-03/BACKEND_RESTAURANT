const Area = require('../models/area.model')
const { Op } = require('sequelize');

const areaService = {
    async getAllAreas(){
        const areas = await Area.findAll({where: {is_deleted: false}});
        return areas;
    },
    async createArea(area) {
        const newArea = await Area.create(area);
        return newArea;
    },

    // async findareaByName(name) {
    //     const areaes = await area.find({ area_name: name });
    //     return areaes;
    // },

    async getAreaId(areaId) {
        const area = await Area.findByPk(areaId);
        return area;
    },

    async deleteArea(areaId) {
        await Area.update(
            { is_deleted: true },
            { where: { area_id: areaId } }
        );
    }
}

module.exports = areaService;
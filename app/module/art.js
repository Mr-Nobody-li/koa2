/*
 * @Author: lipengfei
 * @Date: 2022-05
 * @LastEditors: lipengfei
 * @LastEditTime: 2022-08
 * @Description: 查询movie music sentence book模型的数据
 * type 100 电影 200 音乐 300 句子 400 书籍
 */
const { Op } = require("sequelize");
const { Movie, Sentence, Music } = require("./classic");

class Art {
  // 获取artInfoList中包含的期刊详细信息数组
  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: [],
    };
    // 根据type进行分类
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id);
    }
    // 获取期刊详细信息数组
    const res = [];
    for (const type in artInfoObj) {
      const artIdList = artInfoObj[type];
      if (artIdList.length) {
        res.push(...(await this.getDataList(artIdList, JSON.parse(type))));
      }
    }
    return res;
  }

  // 获取artIdList包含的id的数据
  static async getDataList(artIdList, type) {
    const finder = {
      where: {
        id: {
          [Op.in]: artIdList,
        },
      },
    };
    switch (type) {
      case 100:
        return await Movie.findAll(finder);
      case 200:
        return await Music.findAll(finder);
      case 300:
        return await Sentence.findAll(finder);
    }
  }

  // 获取id为art_id的某条数据
  static async getData(art_id, type) {
    const finder = {
      where: {
        id: art_id,
      },
    };
    switch (type) {
      case 100:
        return await Movie.findOne(finder);
      case 200:
        return await Music.findOne(finder);
      case 300:
        return await Sentence.findOne(finder);
    }
  }
}

module.exports = {
  Art,
};

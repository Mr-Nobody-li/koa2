/*
 * @Author: lipengfei
 * @Date: 2022-05
 * @LastEditors: lipengfei
 * @LastEditTime: 2022-05
 * @Description:
 */

const { Movie, Sentence, Music } = require("./classic");

class Art {
  // 获取movie music sentence模型其中的某条数据
  // type 100 电影 200 音乐 300 句子
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

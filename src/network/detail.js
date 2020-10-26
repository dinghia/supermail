import { request } from './request'

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: { iid }
    })
}

// 商品信息相关的类
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discoun = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}
//商家信息相关的类
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}
//商品参数数据
export class GoodsParam {
    constructor(info, rule) {
        this.iamge = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}
//详细页面的推荐列表的相关数据
export function getRecommend() {
    return request({
        url: '/recommend'
    })
}
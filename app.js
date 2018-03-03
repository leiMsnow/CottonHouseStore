//app.js
let Bmob = require('./utils/bmob.js');
let util = require('./utils/util.js');
let decryptData = require('./utils/decryptData.js');
Bmob.initialize("6db97159c76c4c21eb4c8d016c680f37", "99bc585280c08beb591874ca45a40512");

App({
    onLaunch: function() {
        
    },

    router: function(url, params) {
        wx.navigateTo({
            url: this.getUrls(url, params),
        });
    },
    redirect: function(url, params) {
        wx.redirectTo({
            url: this.getUrls(url, params),
        });
    },
    routerTab: function() {
        wx.switchTab({
            url: '../index/index'
        });
    },
    getUrls: function(url, params) {
        let urls = ((util.isEmpty(url)) ? '../temp/temp' : url) + (util.isEmpty(params) ? '' : '?params=' + JSON.stringify(params));
        console.log('getUrls: ' + urls);
        return urls;
    },
    globalData: {
        userInfo: {
            'openId': 'oYmIJ0WrP-9rUOlqmtwqzG1txV1M',
            'nickName': '🍭张小雷',
            'avatarUrl': "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIBNZGSVMZ3vMmY9VeLibgt8xSSkic8ibczuibib5ngNbHVB4O1GerEjqZ9LJCCIPcKG0LaYLyYOdaic9bw/0",
        },
        Bmob: Bmob,
        session_key: '',
        appName: '棉花房子小卖部'
    }
});
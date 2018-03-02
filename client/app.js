//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    // router
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
            url: '../home/home'
        });
    },
    getUrls: function(url, params) {
        let urls = ((util.isEmpty(url)) ? '../temp/temp' : url) + (util.isEmpty(params) ? '' : '?params=' + JSON.stringify(params));
        console.log('getUrls: ' + urls);
        return urls;
    },
})
/*************************************

项目名称：彩云天气/彩云天气Pro
版本支持：7.11.0
更新日期：2024-06-22
脚本作者：chxm1023,NateF
使用声明：脚本来自于chxm1023佬的QuanX脚本，经NateF修改后支持Spider-Proxy

*************************************/


const caiyun = {};
const caiyun = JSON.parse(typeof $response != "undefined" && $response.body || null);
const url = $request.url;
const adUrl = /(activity\?app_name|operation\/banners)/;
const vipUrl = /https:\/\/biz\.(cyapi\.cn|caiyunapp\.com)\/p\/v\d\/vip_info/;
const userUrl = /https:\/\/biz\.(cyapi\.cn|caiyunapp\.com)\/v\d\/user\?app_name/;
const infoUrl = /https:\/\/biz\.(cyapi\.cn|caiyunapp\.com)\/p\/v\d\/user_info/;
const aiUrl = /ai\/weather\/quotas/;
const qyUrl = /entries/;
const peUrl = /privileges/;
const topUrl = /operation\/homefeatures/;

if (typeof $response == "undefined") {
  caiyun.headers = $request.headers;
  caiyun.headers['device-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNjViYzc1NzAwYTBkNTYwMDFiZmJkODhjIiwidXNlcl9pZCI6IjVmODNhMDY3MTk5NzZmMDAxNWEyNTRiNiIsInZlcnNpb24iOjIsImV4cCI6MTcwOTQ4MjAwMCwidmlwX2V4cGlyZWRfYXQiOjAsImlzcyI6IndlYXRoZXIiLCJpYXQiOjE3MDY4OTAwMDAsInN2aXBfZXhwaXJlZF9hdCI6MTcxNDMyMTgxMiwicHJpbWFyeSI6dHJ1ZX0.v41eOWgj4FmMMYLygupRLeE2hC8KW_HltSsdFk03oP4';
} else {
  switch (true) {
    case adUrl.test(url):
      caiyun.status = "ok";
      caiyun.activities = [{"items":[{}]}];
      caiyun.data = [];
      break;
    case vipUrl.test(url):
      caiyun.vip = {  ...caiyun.vip,
  "expires_time" : "4092599349",  "is_auto_renewal" : true  };
      caiyun.svip =  {  ...caiyun.svip,  "expires_time" : "4092599349",  "is_auto_renewal" : true  };
      caiyun.show_upcoming_renewal = false;
      break;
    case userUrl.test(url):
      caiyun.result = { ...caiyun.result,  is_vip: true,  vip_expired_at: 4092599349,  svip_given: 1,  is_xy_vip: true,  xy_svip_expire: 4092599349,  wt: {  ...caiyun.result.wt,  vip: {  ...caiyun.result.wt.vip,  "expired_at" : 0,  "enabled" : true,  "svip_apple_expired_at" : 4092599349,  "is_auto_renewal" : true,  "svip_expired_at" : 4092599349    },    svip_given: 1,  },  is_phone_verified: true,  vip_take_effect: 1,  is_primary: true,  xy_vip_expire: 4092599349,  svip_expired_at: 4092599349,  svip_take_effect: 1,  vip_type: "s",  };
      break;
    case infoUrl.test(url):
      caiyun["reg_days"] = 99999;
      break;
    case aiUrl.test(url):
      caiyun.remain = 999;
      caiyun.subscription_remain = 999;
      caiyun.subscription_quota = 999;
      caiyun.addition_remain = 999;
      caiyun.subscription_quota_end_time = 4092599349;
      caiyun.free_remain = 999;
      caiyun.free_quota = 999;
      break;
    case qyUrl.test(url):
      caiyun["entries"] = [{  "url" : "https://t.me/chxm1023",  "id" : 1,  "name" : "叮当猫",  "type" : 1,  "pos" : 2  }];
      break;
    case peUrl.test(url):
      caiyun["privileges"] = [{  "vip_type" : "svip",  "subscription_chat_quota" : 999  }];
      break;
    case topUrl.test(url):
      caiyun["data"] = [{  "badge_type" : "",  "title" : "叮当猫",  "url" : "https://t.me/chxm1023",  "feature_type" : "",  "avatar" : "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/ddm2.png"  },...caiyun.data];
      break;
    }
  caiyun.body = JSON.stringify(caiyun);
}

$done(caiyun);

! function (e) {
	"function" == typeof define && define.amd ? define(e) : e()
}(function () {
	"use strict";

	function u(e, o, a, c) {
		return new (a = a || Promise)(function (s, t) {
			function r(e) {
				try {
					i(c.next(e))
				} catch (e) {
					t(e)
				}
			}

			function n(e) {
				try {
					i(c.throw(e))
				} catch (e) {
					t(e)
				}
			}

			function i(e) {
				var t;
				e.done ? s(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
					e(t)
				})).then(r, n)
			}
			i((c = c.apply(e, o || [])).next())
		})
	}
	const i = {
		OK: "OK",
		UNSUPPORTED_API: "UNSUPPORTED_API",
		TIMEOUT: "TIMEOUT",
		INVALID_PARAM: "INVALID_PARAM",
		NOT_READY: "NOT_READY",
		ADS_NO_FILL: "ADS_NO_FILL",
		AD_LOAD_FAILED: "AD_LOAD_FAILED",
		AD_DISMISSED: "AD_DISMISSED",
		AD_NOT_LOADED: "AD_NOT_LOADED",
		AD_ALREADY_LOADED: "AD_ALREADY_LOADED",
		AD_ALREADY_SHOWED: "AD_ALREADY_SHOWED"
	},
		j = {
			CODE: i,
			OK: {
				code: i.OK,
				message: "Success"
			},
			TIMEOUT: {
				code: i.TIMEOUT,
				message: "timeout"
			},
			adLoadFail: {
				code: i.AD_LOAD_FAILED,
				message: "Ad load failed"
			},
			adDismissed: {
				code: i.AD_DISMISSED,
				message: "Ad dismissed"
			},
			adNotLoaded: {
				code: i.AD_NOT_LOADED,
				message: "Ad not loaded"
			},
			adAlreadyLoaded: {
				code: i.AD_ALREADY_LOADED,
				message: "Ad already loaded"
			},
			adAlreadyShowed: {
				code: i.AD_ALREADY_SHOWED,
				message: "Ad already showed"
			}
		};
	var o, F, M, q;

	function L(s, e) {
		return u(this, void 0, void 0, function* () {
			return new Promise(function (e, t) {
				t(s)
			})
		})
	} (e = o = o || {}).emptyWait = function (s) {
		return u(this, void 0, void 0, function* () {
			return new Promise(function (e, t) {
				s ? t(new Error("Failed by design")) : e()
			})
		})
	}, e.emptyWaitObject = function (s) {
		return u(this, void 0, void 0, function* () {
			return new Promise(function (e, t) {
				e(s)
			})
		})
	}, e.emptyWaitBool = function (s, e) {
		return u(this, void 0, void 0, function* () {
			return new Promise(function (e, t) {
				e(s)
			})
		})
	}, e.emptyWaitString = function (s, e) {
		return u(this, void 0, void 0, function* () {
			return new Promise(function (e, t) {
				e(s)
			})
		})
	}, e.emptyWaitError = L, e.emptyWaitUnsupportApi = function (t) {
		return u(this, void 0, void 0, function* () {
			return L((e = t, {
				code: j.CODE.UNSUPPORTED_API,
				message: "unsupport api:" + e
			}));
			var e
		})
	}, e.generateId = function () {
		return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
	};
	class U {
		constructor(e = null, t = "SOLO") {
			this._sId = e, this._sType = t
		}
		static get currentContext() {
			return this._currentContext || (this._currentContext = new U), this._currentContext
		}
		static set currentContext(e) {
			this._currentContext = e
		}
		getID() {
			return this._sId
		}
		getType() {
			return this._sType
		}
		isSizeBetween(e, t) {
			return {
				answer: !1,
				minSize: e || 0,
				maxSize: t || 0
			}
		}
		switchAsync(e) {
			return this._sId = e, o.emptyWaitObject(null)
		}
		chooseAsync(e) {
			return o.emptyWaitUnsupportApi("context.chooseAsync")
		}
		createAsync(e) {
			return o.emptyWaitUnsupportApi("context.createAsync")
		}
		getPlayersAsync() {
			return o.emptyWaitObject([])
		}
	}
	let H = "_minigame_data_",
		z = {},
		W = !1;

	function a(e, t) {
		if (null == e || "" === e.trim()) throw {
			code: j.CODE.INVALID_PARAM,
			message: "Invalid key: " + e
		};
		e = z[e];
		return void 0 !== e ? e : t
	}

	function $(e, t) {
		if (null == e || "" === e.trim()) throw {
			code: j.CODE.INVALID_PARAM,
			message: "Invalid key: " + e
		};
		z[e] = t
	}

	function c() {
		try {
			var e = JSON.stringify(z);
			localStorage.setItem(H, e), localStorage.flush && localStorage.flush()
		} catch (e) {
			console.error("LocalCache.flush error: ", e)
		}
	}
	class G {
		constructor() {
			this._configUrl = "", this._gameId = "", this._appId = "", this._channel = "", this._channelName = "", this._minigameOption = null, this._playPageData = null, this._locationSearch = ""
		}
		get configUrl() {
			return this._configUrl
		}
		get gameId() {
			return this._gameId
		}
		get appId() {
			return this._appId
		}
		get channel() {
			return this._channel
		}
		get channelName() {
			return this._channelName
		}
		get minigameOption() {
			return this._minigameOption
		}
		get playPageData() {
			return this._playPageData
		}
		set playPageData(e) {
			this._playPageData = e
		}
		get locationSearch() {
			return this._locationSearch = window.location.search, this._locationSearch
		}
		static get instance() {
			return this._instance || (this._instance = new G), this._instance
		}
		init(e) {
			this._channel = this.getSubChannelName(), this._channelName = this.getChannelName(), this._minigameOption = e, this._gameId = "" + e.game_id, this._appId = "" + e.app_id, this._locationSearch = window.location.search, window.commonInfo = G
		}
		getChannelName() {
			return window.globalPlatformInfo.channelName || window.channelName || this._playPageData.channelName
		}
		getSubChannelName() {
			return window.globalPlatformInfo.subChannelName || window.subChannelName || this._playPageData.subChannelName
		}
		getChannelConfigId() {
			return this._playPageData.channelConfigId
		}
		getGameManifestJsonUrl() {
			return this._playPageData.gameManifestJsonUrl
		}
		isH5AndroidApp() {
			return this._minigameOption ? this._minigameOption.android ? this._minigameOption.android.enabled : (console.warn("minigame config has not android field!!!"), !1) : (console.warn("minigame config is not exist!!!"), !1)
		}
		isAdflyEnable() {
			return this._minigameOption ? this._minigameOption.cpl ? this._minigameOption.cpl.adflyer ? this._minigameOption.cpl.adflyer.enabled : (console.warn("cpl config has not adflyer field!!!"), !1) : (console.warn("minigame config has not cpl field!!!"), !1) : (console.warn("minigame config is not exist!!!"), !1)
		}
		getAdflyChannelID() {
			return this.isAdflyEnable() ? this._minigameOption.cpl.adflyer.channelId : ""
		}
	}
	G._instance = null;
	const d = G.instance,
		l = {
			addCallbackEvent(e) {
				e && 0 < e.length && e.forEach(t => {
					t.ele && t.ele.addEventListener(t.eventName, e => {
						t.eventFunc && t.eventFunc(e)
					})
				})
			},
			createDailogContainer(e) {
				let t = document.getElementById("minigameDailogContainer");
				return t || ((t = document.createElement("div")).setAttribute("id", "minigameDailogContainer"), t.setAttribute("style", `${e ? "display:none;" : ""}font-size: 16px;font-family: Microsoft YaHei;font-weight: 400; position: fixed;top:0;  z-index: 20000; overflow: hidden; width: 100vw;height: 100vh; background-color: rgb(0, 0, 0,0.6);`), document.body.append(t)), t
			},
			removeDailogContainer(e) {
				var t = document.getElementById("minigameDailogContainer");
				t && t.childNodes && t.childNodes.length <= 1 ? t && t.remove() : e && e instanceof Function && e()
			}
		};
	let K;

	function V(e, t) {
		var s, r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
			n = [];
		let i;
		if (t = t || r.length, e)
			for (i = 0; i < e; i++) n[i] = r[0 | Math.random() * t];
		else
			for (n[8] = n[13] = n[18] = n[23] = "-", n[14] = "4", i = 0; i < 36; i++) n[i] || (s = 0 | 16 * Math.random(), n[i] = r[19 === i ? 3 & s | 8 : s]);
		return n.join("")
	}

	function Y(e, t) {
		console.log("%c " + e, t || "")
	}
	class h {
		static getTimestamp() {
			return (new Date).getTime()
		}
		static getTimeBySecond() {
			return Math.floor((new Date).getTime() / 1e3)
		}
		static getDate() {
			return (new Date).toLocaleDateString()
		}
		static getTargetTimestamp(e = 0, t = 0, s = 0) {
			var r = new Date((new Date).toLocaleDateString()).getTime();
			return new Date(r + 1e3 * (3600 * e + 60 * t + s)).getTime()
		}
		static waitTime(t, s) {
			return new Promise(e => {
				setTimeout(() => {
					s && s(), e()
				}, t)
			})
		}
	} (e = F = F || {}).json = "application/json", e.form = "application/x-www-form-urlencoded; charset=UTF-8", (e = M = M || {}).get = "GET", e.post = "POST";
	const J = new class {
		constructor() {
			this.handleUrl = e => t => {
				if (t) {
					const s = [];
					Object.keys(t).forEach(e => s.push(e + "=" + encodeURIComponent(t[e]))), -1 === e.search(/\?/) ? "object" == typeof t && (e += "?" + s.join("&")) : e += "&" + s.join("&")
				}
				return e
			}
		}
		getFetch(t, e, s) {
			return u(this, void 0, void 0, function* () {
				return s = {
					method: M.get,
					headers: {
						"Content-Type": F.json
					}
				}, yield fetch(this.handleUrl(t)(e), s).then(e => e.ok ? e.json() : Promise.reject("request failed with status " + e.status)).then(e => e).catch(e => Promise.reject(`get ${t} fail` + e.message))
			})
		}
		postFetch(s, r) {
			return u(this, void 0, void 0, function* () {
				const t = new FormData;
				Object.keys(r).forEach(e => t.append(e, r[e]));
				var e = new Headers,
					e = (e.append("Content-Type", "application/json"), {
						method: M.post,
						headers: e,
						body: JSON.stringify(r),
						redirect: "follow"
					});
				return yield fetch(s, e).then(e => e.ok ? e.json() : Promise.reject({
					code: e.status,
					message: `post ${s} fail status: ` + e.status
				})).then(e => (console.info(`post ${s} success response: ` + JSON.stringify(e)), e)).catch(e => Promise.reject({
					code: "server error",
					message: `post ${s} fail` + e.message
				}))
			})
		}
	};

	function X(e, t) {
		return u(this, void 0, void 0, function* () {
			return J.postFetch(e, t)
		})
	}

	function Q(t, s, r = 3) {
		return u(this, void 0, void 0, function* () {
			return r < 3 && (yield h.waitTime(1e3)), X(t, s).then(e => Promise.resolve(e)).catch(e => 0 < r ? (console.error(`post ${t} retry ${r} times`), Q(t, s, r - 1)) : Promise.reject({
				code: "fetch retry failed",
				message: `post ${t} fail` + e
			}))
		})
	}
	class m { }
	m.PAY_IP = "https://purchase2.minigame.vip", m.MINI_ORDER_ID = "v2/purchase/miniorder", m.SET_DATA = "v1/archive", m.GET_DATA = "v1/archive", m.STORAGE_IP = "https://storage.minigame.vip:30443";
	class Z { }
	Z.ADS_NETWORK_NOT_FOUND = "ADS_NETWORK_NOT_FOUND";
	class ee { }
	ee.DOMAIN = "https://ingress.minigame.vip:30443", ee.TESTDOMAIN = "https://app.minigame.work:19443", ee.API_PATH = "/v1/mam/api/mda/random", ee.BATCH_API_PATH = "/v1/mam/api/mda/batch_random", (e = q = q || {}).WAITING = "0", e.PAYING = "1", e.SUCCESS = "2";
	class te {
		constructor() {
			this._curProducts = [], this._curProductInfos = []
		}
		static getInstance() {
			return this._instance || (this._instance = new te), this._instance
		}
		init(t) {
			return u(this, void 0, void 0, function* () {
				te._instance = this;
				try {
					emoPaySDK.api.initSDK(t), console.info("inititial emo pay sdk success")
				} catch (e) {
					return ue.showWithInit("OK", "Payment initialization failed"), Promise.reject({
						code: "emoPay init fail",
						message: e.message
					})
				}
				try {
					var e = yield this.query();
					return this._curProducts.length = 0, this._curProducts = this._curProducts.concat(e), console.info("query goods info: ", this._curProducts), Promise.resolve()
				} catch (e) {
					return Promise.reject({
						code: "query goods fail",
						message: e.message
					})
				}
			})
		}
		pay(n, i) {
			return u(this, void 0, void 0, function* () {
				let e = !1;
				try {
					e = yield this.checkLoginAsync()
				} catch (e) {
					return ue.showWithInit("OK", `Network error, please check 
if the network is available`), Promise.reject({
						code: "pay error",
						message: e.message
					})
				}
				if (!e) return ue.showWithInit("Login", `You are currently not logged in, 
or the token has expired, 
please log in again`, () => {
					ce.show()
				}), Promise.reject({
					code: "login error",
					message: "without login, please login frist."
				});
				try {
					var t = {},
						s = (t.orderNo = i || V(), t.productId = n, yield this.buyGoods(t)),
						r = {
							paymentID: "",
							signedRequest: ""
						};
					return r.productID = n, r.purchaseTime = s.paidTime, r.purchaseToken = s.cpOrderNo, Promise.resolve(r)
				} catch (e) {
					return ue.showWithInit("OK", "Payment failed, please pay again"), Promise.reject({
						code: "pay fail",
						message: e.message
					})
				}
			})
		}
		query() {
			return new Promise((t, r) => {
				emoPaySDK.api.requestGoods(e => {
					0 !== e.code && r({
						code: "request goods fail",
						message: e.msg
					}), null != e.data && 0 !== e.data.length || r({
						code: "request goods empty",
						message: "request goods empty"
					});
					const s = [];
					e = e.data;
					(this._curProductInfos = e).forEach(e => {
						var t = {};
						t.title = e.goodsName, t.price = "" + e.amount, t.productID = e.goodsId, t.description = e.goodsExp, t.priceCurrencyCode = "", t.imageURI = "", s.push(t)
					}), t(s)
				})
			})
		}
		queryUncomsume() {
			return u(this, void 0, void 0, function* () {
				try {
					var e = yield Q(`${m.PAY_IP}/${m.MINI_ORDER_ID}/query`, {
						thirdUid: emoPaySDK.api.getUserId()
					}), t = (console.log("query uncomsume orderInfos: ", e), e.paidMiniOrders);
					const r = [];
					return t.forEach(t => {
						var e = this._curProducts.filter(e => e.productID === t.productId)[0],
							s = {
								paymentID: "",
								purchaseTime: ""
							};
						s.productID = e.productID, s.purchaseToken = t.thirdOrderId, s.signedRequest = "", r.push(s)
					}), Promise.resolve(r)
				} catch (e) {
					return Promise.reject({
						code: "query uncomsume order",
						message: e.message
					})
				}
			})
		}
		consume(e) {
			return u(this, void 0, void 0, function* () {
				try {
					yield Q(`${m.PAY_IP}/${m.MINI_ORDER_ID}/consume`, {
						mini_order_id: e
					});
					return Promise.resolve()
				} catch (e) {
					return Promise.reject({
						code: "consume_fail",
						message: e.message
					})
				}
			})
		}
		onReady(e) { }
		checkUserLoginStatus() {
			return new Promise((t, s) => {
				emoPaySDK.api.checkUserLoginStatus(e => {
					0 === e ? t(!0) : -1 === e || -2 === e ? t(!1) : s({
						code: "check user login status error",
						message: JSON.stringify(e)
					})
				})
			})
		}
		buyGoods(n) {
			return console.info("=====> pay options: ", n), new Promise((t, s) => {
				var e, r = this._curProductInfos.filter(e => e.goodsId === n.productId)[0];
				null == r ? s({
					message: "product not found"
				}) : (e = {
					game_id: d.gameId
				}, e = JSON.stringify(e), console.info("=====> emoPay buyGoods ing"), emoPaySDK.api.buyGoods(r, n.orderNo, e, "http://purchase.minigame.vip/v2/purchase/emo/callback", e => {
					console.info("emoPay buyGoods response: ", e), 0 === e.code && null != e.data ? e.data.paySt === q.SUCCESS ? (console.info("pay success"), t(e.data)) : (console.info("pay fail"), s({
						code: "pay fail",
						message: e.msg
					})) : s({
						code: "buy goods fail",
						message: e.msg
					})
				}))
			})
		}
		guestLogin() {
			return new Promise((t, s) => {
				emoPaySDK.api.guestLogin(e => {
					0 === e.code ? (console.info("guest login success"), t()) : (console.info("guest login fail"), s({
						code: "guest login fail",
						message: e.msg
					}))
				})
			})
		}
		sendVerifyCode(e) {
			return new Promise((t, s) => {
				emoPaySDK.api.requestOpt(e, e => {
					0 === e.code ? t() : s({
						code: "send verify code fail",
						message: e.msg
					})
				})
			})
		}
		phoneLogin(e, r) {
			return new Promise((t, s) => {
				emoPaySDK.api.phoneLogin(e, r, e => {
					0 === e.code ? t() : s({
						code: "phone login fail",
						message: e.msg
					})
				})
			})
		}
		userLogin(e, t) {
			return this.phoneLogin(e, t)
		}
		getUserId() {
			return emoPaySDK.api.getUserId() || ""
		}
		getUserToken() {
			return emoPaySDK.api.getUserToken()
		}
		checkLoginAsync() {
			return u(this, void 0, void 0, function* () {
				try {
					var e = yield this.checkUserLoginStatus();
					return e && x.storageType !== S.Cloud || !e ? Promise.resolve(!1) : Promise.resolve(!0)
				} catch (e) {
					return Promise.reject({
						code: "check Login error",
						message: e.message
					})
				}
			})
		}
	}
	const se = te.getInstance(),
		re = {};
	re.EmoPay = te;
	class ne {
		static getClass(e, t) {
			return void 0 === re[e] || null === re[e] ? (console.warn(`未找到 className：${e} 对应实现`), null) : new re[e](t)
		}
		static checkValidClass(e) {
			return void 0 === re[e] || null === re[e] ? null : e
		}
	}
	let ie = document;

	function oe(i, o = !1, a) {
		return u(this, void 0, void 0, function* () {
			return new Promise((e, t) => {
				const s = ie.createElement("script");
				if (s.src = i, s.async = o, a)
					for (const n in a) s.setAttribute(n, a[n]);
				const r = () => {
					s.removeEventListener("load", r), e()
				};
				s.addEventListener("load", r), s.addEventListener("error", e => {
					console.error(e), t(new Error("Failed to load " + i))
				}), (ie.getElementsByTagName("head")[0] || document.documentElement).appendChild(s)
			})
		})
	}
	const ae = class ri {
		constructor() {
			this._payPlatormInfo = null, this._curPayment = null, this._isPayEnable = !1, this._inited = !1
		}
		static get instance() {
			return this._instance || (this._instance = new ri), this._instance
		}
		set payEnable(e) {
			this._isPayEnable = e
		}
		get payEnable() {
			return this._isPayEnable
		}
		get inited() {
			return this._inited
		}
		init(e) {
			throw new Error("Method not implemented.")
		}
		pay(e, t) {
			return console.info("=====> pay productID: ", e), this._inited ? this._curPayment ? this._curPayment.pay(e, t) : (console.error("purchase fail no payment selected"), Promise.reject({
				code: "purchaseAsync fail",
				message: "no payment selected"
			})) : (ue.showWithInit("OK", `The payment initialization failed. 
Please restart the game if you 
want to make a payment.`), Promise.reject({
				code: "fail to initialize payment",
				message: "payment inited false"
			}))
		}
		query() {
			return u(this, void 0, void 0, function* () {
				if (!this._curPayment) return Promise.reject({
					code: "getCatalogAsync fail",
					message: "no payment selected"
				});
				try {
					var e = yield this._curPayment.query();
					return console.info("get products : ", e), e
				} catch (e) {
					return Promise.reject({
						message: "getCatalog fail " + e.message
					})
				}
			})
		}
		queryUncomsume() {
			return this._curPayment ? this._curPayment.queryUncomsume() : Promise.reject({
				code: "getPurchasesAsync fail",
				message: "no payment selected"
			})
		}
		consume(e) {
			return this._curPayment ? this._curPayment.consume(e) : Promise.reject({
				code: "consumePurchaseAsync fail",
				message: "no payment selected"
			})
		}
		onReady(e) {
			this._curPayment ? this._curPayment.onReady(e) : console.error("no payment selected")
		}
		fetchPayConfig(s) {
			return u(this, void 0, void 0, function* () {
				try {
					var e, t = yield fetch(s);
					return 404 === t.status ? Promise.reject({
						code: "fetchPayConfig fail " + s
					}) : (e = (yield t.json()).infos.filter(e => e.enabled)[0], this._curPayment = ne.getClass(e.id), this._payPlatormInfo = e, this._curPayment ? (console.info("load pay config: ", s), this._isPayEnable = !0, Promise.resolve()) : Promise.reject({
						code: "this._curPayment null " + e.id
					}))
				} catch (e) {
					return Promise.reject({
						message: "fetchPayConfig fail " + e.message
					})
				}
			})
		}
		loadSDK() {
			return u(this, void 0, void 0, function* () {
				try {
					return yield oe(this._payPlatormInfo.sdkUrl, !0), console.info("load pay dk: ", this._payPlatormInfo.sdkUrl), Promise.resolve()
				} catch (e) {
					return Promise.reject({
						message: "load pay sdk fail " + e.message
					})
				}
			})
		}
		loadPayment(e) {
			return u(this, void 0, void 0, function* () {
				try {
					return yield this.fetchPayConfig(e), yield this.loadSDK(), this._curPayment.init(this._payPlatormInfo.channel), this._inited = !0, Promise.resolve()
				} catch (e) {
					return Promise.reject({
						code: "loadPayment fail",
						message: e.message
					})
				}
			})
		}
		setPayment(e) {
			e ? this._curPayment = e : console.error("payment is null")
		}
		getUserId() {
			return this._curPayment ? this._curPayment.getUserId() : ""
		}
		guestLogin() {
			return this._curPayment ? this._curPayment.guestLogin() : Promise.reject({
				code: "payHelper guestLogin fail",
				message: "this _curPayment is null"
			})
		}
		userLogin(e, t) {
			return this._curPayment ? this._curPayment.userLogin(e, t) : Promise.reject({
				code: "payHelper userLogin fail",
				message: "this _curPayment is null"
			})
		}
		checkLoginAsync() {
			return this._curPayment ? this._curPayment.checkLoginAsync() : Promise.reject({
				code: "checkLoginAsync fail",
				message: "no payment selected"
			})
		}
	}.instance,
		ce = {
			currentCtx: null,
			show() {
				const n = document.createElement("div");
				n.setAttribute("style", "position: absolute;z-index:1;width:100%;height:100%"), n.innerHTML = `    
      <div style="position: absolute;  left: 0;    top: 0;  bottom: 0;  right: 0;  margin: auto;  width: 289px;  height: 289px;   background: #FFFFFF; box-shadow: 0px 2px 7px 0px rgba(143, 143, 143, 0.48);  border-radius: 11px;    display: flex;flex-direction: column;align-items: center;justify-content: center;   ">
          <div id="registerCloseBtn" style="position: absolute;right: 10px;top: 10px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path style="fill: #4398FE "
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z">
                  </path>
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
              </svg>
          </div>
          <div id="registerError" style="position: absolute;right: 37px;top: 139px;font-size: 6px;font-weight: 400;color: #FB4242;"></div>
          <div style="width: 202px;height: 17px;font-size: 15px;font-family: Microsoft YaHei;font-weight: bold;color: #010101;">Login with Phone Number</div>
          <div style="margin-top:15px;width: 218px;height: 30px;border: 1px solid #BABABA;border-radius: 6px;display: flex;flex-direction: row;align-items: center;justify-content: center;"><div style="    width: 46px;border-right: 1px solid #CECECE ;"><select style="border: none;outline: none;" name="registerAreacode" id="registerAreacode">
              <option value="91">+91</option>
              <option value="1">+1</option>
          </select></div><div style="flex: 1;"><input style="font-size: 12px;font-family: Microsoft YaHei;font-weight: 400;color: #515151;;background-color:transparent;border:0;width:90%;outline:none;margin-left: 6px;"
              type="text" id="registerPhone" name="registerPhone" required placeholder="Please fill in the phone"></div></div>
          <div id="registerSendBtn" style="margin-top:12px;font-size: 12px;font-family: Microsoft YaHei;font-weight: 400;color: #FFFFFF;width: 218px;height: 35px;background: #4398FE;border-radius: 6px;display: flex;flex-direction: column;align-items: center;justify-content: center;">Send</div>                    
          <div id="registerSendText" style="display: none;;text-align: center;margin-top:11px;font-size: 10px;font-family: Microsoft YaHei;font-weight: 400;color: #FFFFFF;width: 218px;height: 35px;background: #BABABA;border-radius: 6px;    padding-top: 3px;box-sizing: border-box;">Wait tor <span id="registerTime">60</span> s <br>To Request Another Code</div>
          <div style="margin-top:15px;width: 218px;height: 30px;border: 1px solid #BABABA;border-radius: 6px;display: flex;flex-direction: column;align-items: center;justify-content: center;"><input style="font-size: 12px;font-family: Microsoft YaHei;font-weight: 400;color: #515151;;background-color:transparent;border:0;width:90%;outline:none" type="text" id="registerVfcode" name="registerVfcode" required placeholder="Verification Code"> </div>
          <div id="registerLoginBtn" style="margin-top:12px;font-size: 12px;font-family: Microsoft YaHei;font-weight: 400;color: #FFFFFF;width: 218px;height: 35px;background: #4398FE;border-radius: 6px;display: flex;flex-direction: column;align-items: center;justify-content: center;">Login</div>
          <div style="margin-top: 15px;    text-align: center;width: 210px;height: 17px;font-size: 8px;font-family: Microsoft YaHei;font-weight: 400;color: #010101;">By proceeding, you agree to our <span><a href="" target="_blank" style="color: #4398FE;" > Terms & Conditions</a></span>& <span><a href="" target="_blank" style="color: #4398FE;">Privacy Policy.</a></span></div>
      </div>`, l.createDailogContainer().append(n), (this.currentCtx = n) && (this.initRegisterUi([91, 86]), l.addCallbackEvent([{
					ele: n.querySelector("#registerCloseBtn"),
					eventName: "click",
					eventFunc: () => {
						this.hide()
					}
				}, {
					ele: n.querySelector("#registerSendBtn"),
					eventName: "click",
					eventFunc: () => u(this, void 0, void 0, function* () {
						n.querySelector("#registerSendBtn") && (n.querySelector("#registerSendBtn").style.display = "none"), n.querySelector("#registerSendText") && (n.querySelector("#registerSendText").style.display = "block"), this.countdownFunc(60);
						try {
							var e = "" + (document.getElementById("registerAreacode") && document.getElementById("registerAreacode").value || "") + (document.getElementById("registerPhone") && document.getElementById("registerPhone").value || "");
							yield se.sendVerifyCode(e), console.info("sendVerifyCode success")
						} catch (e) {
							console.error("sendVerifyCode error", e)
						}
					})
				}, {
					ele: n.querySelector("#registerLoginBtn"),
					eventName: "click",
					eventFunc: () => u(this, void 0, void 0, function* () {
						var e = n.querySelector("#registerAreacode") && n.querySelector("#registerAreacode").value || "",
							t = n.querySelector("#registerPhone") && n.querySelector("#registerPhone").value || "",
							s = n.querySelector("#registerVfcode") && n.querySelector("#registerVfcode").value || "";
						if (10 === t.length && /^\d{1,}$/.test(t))
							if (0 === s.length) this.displayErrorMessage("verification code error");
							else {
								var r, e = "" + e + t;
								try {
									de.init(), de.show(), yield ae.userLogin(e, s), console.info("phoneLogin success"), x.storageType === S.Local ? (r = yield x.checkNewUser(), x.storageType = r ? S.Cloud : S.Local, x.userPhone = r ? t : "", de.hide()) : (de.hide(), x.storageType = S.Cloud, x.userPhone = t, le.success({
										message: "Login success",
										autoCloseTime: 2,
										top: "50%",
										left: "50%"
									})), this.hide()
								} catch (e) {
									console.error("phoneLogin error", e), de.hide(), this.hide(), ue.showWithInit("OK", "Login failed, please try again", () => {
										ce.show()
									})
								}
							}
						else this.displayErrorMessage("phone number error")
					})
				}, {
					ele: n.querySelector("#registerPhone"),
					eventName: "input",
					eventFunc: e => {
						var t = e.target.value || "";
						/^\d+$/.test(t) ? this.displayErrorMessage("") : (e.target.value = t.replace(/\D+/, ""), this.displayErrorMessage("Please key in numbers!"))
					}
				}]))
			},
			hide() {
				l.removeDailogContainer(() => {
					this.currentCtx && this.currentCtx.remove()
				})
			},
			displayErrorMessage(e) {
				var t = this.currentCtx.querySelector("#registerError");
				t && (t.innerText = e)
			},
			addCallbackEvent(e) {
				e && 0 < e.length && e.forEach(t => {
					t.ele && t.ele.addEventListener(t.eventName, e => {
						t.eventFunc && t.eventFunc(e)
					})
				})
			},
			countdownFunc(e) {
				const s = this.currentCtx,
					r = s.querySelector("#registerTime");
				return function e(t) {
					r.innerText = t, t--, setTimeout(() => {
						0 < (r.innerText = t) ? e(t) : (s.querySelector("#registerSendBtn") && (s.querySelector("#registerSendBtn").style.display = "flex"), s.querySelector("#registerSendText") && (s.querySelector("#registerSendText").style.display = "none"))
					}, 1e3)
				}(e)
			},
			initRegisterUi(e) {
				const s = this.currentCtx.querySelector("#registerAreacode");
				e && 0 < e.length && s && (s.innerHTML = "", e.forEach(e => {
					var t = document.createElement("option");
					t.setAttribute("value", "" + e), t.innerText = "+" + e, s.appendChild(t)
				}))
			}
		},
		de = {
			currentCtx: null,
			btn: {
				name: "",
				func: () => {
					de.hide()
				}
			},
			init(e) {
				return this.btn.name = "", this.btn.func = () => {
					de.hide()
				}, e && (this.btn.name = e.btnName, this.btn.func = e.btnFunc), this.btn.hidden = !(0 < this.btn.name.length), this
			},
			show() {
				var e = `
      <div style="margin-top: -25px;top: 50%;width: 100%;text-align: center;position: absolute;display: flex;flex-direction: column;justify-content: center;align-items: center;">
          <svg  t="1655447361916" style="animation: waitRotating 2s linear infinite;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3916" width="10" height="10"><path d="M768 576v-128h192v128h-192z m-120.32-290.24l136-135.68 90.24 90.24-135.68 136zM448 768h128v192h-128v-192z m0-704h128v192h-128V64zM150.08 783.68l135.68-136 90.56 90.56-136 135.68z m0-543.36l90.24-90.24 136 135.68-90.56 90.56zM256 576H64v-128h192v128z m617.92 207.68l-90.24 90.24-136-135.68 90.56-90.56z" fill="#409EFF" p-id="3917"></path></svg>
          <p style="color: #409EFF;margin: 3px 0;font-size: 14px;">Loading...</p>
          ${this.btn.name ? `<div id="css_wait_ctx_cancel" style="margin-top: 25px;width: 130px;text-align: center;background: #fff;height: 30px;line-height: 30px;border-radius: 30px;">${this.btn.name}</div>` : ""}
      </div>
      `,
					t = document.createElement("div"),
					e = (t.setAttribute("style", "position: absolute;z-index:10;width:100%;height:100%;transition: opacity .3s;background-color: rgb(0, 0, 0,0.6);"), t.innerHTML = e, document.createElement("style")),
					e = (e.id = "css_wait_style", e.type = "text/css", e.innerHTML = `
    @keyframes waitRotating {
        0% {
        transform: rotateZ(0);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }
    `, t.appendChild(e), l.createDailogContainer().append(t), (this.currentCtx = t).querySelector("#css_wait_ctx_cancel"));
				e && e.addEventListener("click", () => {
					this.btn.func && this.btn.func(), this.hide()
				})
			},
			hide() {
				l.removeDailogContainer(() => {
					this.currentCtx && this.currentCtx.remove()
				})
			}
		},
		le = {
			success({
				autoCloseTime: e,
				message: t,
				top: s,
				left: r
			}) {
				const n = e || 1,
					i = s || "50%";
				e = r || "50%";
				const o = document.createElement("div");
				o.innerHTML = `<div style="transition: all 0.5s ease-out;border: 1px solid #e1f3d8;color:#67c23a;background: #f0f9eb;max-width: 300px;min-height: 20px;position: fixed;top: -100%;left:${e};transform: translate(-50%,-50%);z-index: 20001;border-radius: 4px;word-break: break-word;padding: 10px;">
                <div>
                    <svg t="1655970966078" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2181"
                        width="20" height="20">
                        <path
                            d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m-114.176-310.954667a53.333333 53.333333 0 0 0 75.434667 0l323.328-323.328a53.333333 53.333333 0 1 0-75.434667-75.434666l-287.914667 283.306666-128.853333-128.853333a53.333333 53.333333 0 1 0-75.434667 75.434667l168.874667 168.874666z"
                            fill="#67c23a" p-id="2182"></path>
                    </svg>
                </div>
                <div>${t}</div>
            </div>`, document.body.append(o), setTimeout(() => {
					o.firstChild.style.top = i
				}, 500), setTimeout(() => {
					var e = `${o.firstChild.getBoundingClientRect() && o.firstChild.getBoundingClientRect().height / 2 || 0}px`;
					o.firstChild.style.top = e, setTimeout(() => {
						o.remove()
					}, 1e3 * n)
				}, 1e3)
			},
			error({
				autoCloseTime: e,
				message: t,
				top: s,
				left: r
			}) {
				e && (this.autoCloseTime = e);
				const n = e || 1,
					i = s || "50%";
				e = r || "50%";
				const o = document.createElement("div");
				o.innerHTML = `<div  style="transition: all 0.5s ease-out;border: 1px solid #fde2e2;color:#f56c6c;background: #fef0f0;max-width: 300px;min-height: 20px;position: fixed;top: -100%;left:${e};transform: translate(-50%,-50%);z-index: 20001;border-radius: 4px;word-break: break-word;padding: 10px;">
                <div>
                    <svg t="1655971895182" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3456" width="20" height="20"><path d="M827.392 195.584q65.536 65.536 97.792 147.456t32.256 167.936-32.256 167.936-97.792 147.456-147.456 98.304-167.936 32.768-168.448-32.768-147.968-98.304-98.304-147.456-32.768-167.936 32.768-167.936 98.304-147.456 147.968-97.792 168.448-32.256 167.936 32.256 147.456 97.792zM720.896 715.776q21.504-21.504 18.944-49.152t-24.064-49.152l-107.52-107.52 107.52-107.52q21.504-21.504 24.064-49.152t-18.944-49.152-51.712-21.504-51.712 21.504l-107.52 106.496-104.448-104.448q-21.504-20.48-49.152-23.04t-49.152 17.92q-21.504 21.504-21.504 52.224t21.504 52.224l104.448 104.448-104.448 104.448q-21.504 21.504-21.504 51.712t21.504 51.712 49.152 18.944 49.152-24.064l104.448-104.448 107.52 107.52q21.504 21.504 51.712 21.504t51.712-21.504z" p-id="3457" fill="#f56c6c"></path></svg>
                </div>
                <div>${t}</div>
            </div>`, document.body.append(o), setTimeout(() => {
					o.firstChild.style.top = i
				}, 500), setTimeout(() => {
					var e = `${o.firstChild.getBoundingClientRect() && o.firstChild.getBoundingClientRect().height / 2 || 0}px`;
					o.firstChild.style.top = e, setTimeout(() => {
						o.remove()
					}, 1e3 * n)
				}, 1e3)
			}
		},
		ue = {
			message: `Sorry,This account already exists,
please change a new account.\r
\r
If you want switch account,
please click the button.`,
			currentCtx: null,
			btn: {
				name: "OK",
				func: () => { }
			},
			init(e) {
				return this.message = "", this.btn.name = "", this.btn.func = () => { }, e && (this.message = e.message, this.btn.name = e.btnName, this.btn.func = e.btnFunc), this
			},
			show() {
				var e = `    
    <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 278px;  min-height: 210px;   background: #FFFFFF; box-shadow: 0px 2px 7px 0px rgba(143, 143, 143, 0.48);  border-radius: 11px;    display: flex;flex-direction: column;align-items: center;">
        <div style="margin: 20px 0 0px;display: flex;flex-direction: column;justify-content: center;align-items: center;"><div style="width:50px;height:50px;border-radius:50px;    background: url(/images/weiyou.png);background-position: center;background-repeat: no-repeat;background-size: contain;"></div>
        <div style="max-width:268px;padding: 10px 0;min-height: 80px;width: 100%;overflow: hidden;text-align: center;word-break: break-word;box-sizing: border-box;line-height: 20px;white-space: pre-wrap;word-break: break-word;">${this.message}</div>                
        <div id="confirmMessage" style=" margin-bottom: 20px;display: flex; justify-content: center; align-items: center;width: 230px; height: 35px; border-radius: 6px;background: #4398FE;  font-size: 13px;font-family: Microsoft YaHei;font-weight: 400;color: #FFFF" >${this.btn.name}</div>
    </div>`,
					t = document.createElement("div");
				t.setAttribute("style", "position: absolute;z-index:1;width:100%;height:100%"), t.innerHTML = e, l.createDailogContainer().append(t), (this.currentCtx = t) && l.addCallbackEvent([{
					ele: t.querySelector("#minigameDailogContainer #confirmMessage"),
					eventName: "click",
					eventFunc: () => {
						this.removeUi(), this.btn.func && this.btn.func instanceof Function && this.btn.func()
					}
				}])
			},
			showWithInit(e, t, s) {
				var r = {};
				r.btnName = e, r.message = t, r.btnFunc = s, this.init(r), this.show()
			},
			removeUi() {
				l.removeDailogContainer(() => {
					this.currentCtx && this.currentCtx.remove()
				})
			}
		};
	var he = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
		me = {},
		e = {
			get exports() {
				return me
			},
			set exports(e) {
				me = e
			}
		};
	var pe, ge = {},
		ye = {
			get exports() {
				return ge
			},
			set exports(e) {
				ge = e
			}
		};

	function y() {
		return pe || (pe = 1, ye.exports = function (d) {
			var r;
			if ("undefined" != typeof window && window.crypto && (r = window.crypto), "undefined" != typeof self && self.crypto && (r = self.crypto), !(r = !(r = !(r = "undefined" != typeof globalThis && globalThis.crypto ? globalThis.crypto : r) && "undefined" != typeof window && window.msCrypto ? window.msCrypto : r) && void 0 !== he && he.crypto ? he.crypto : r)) try {
				r = require("crypto")
			} catch (e) { }
			var s = Object.create || function (e) {
				return t.prototype = e, e = new t, t.prototype = null, e
			};

			function t() { }
			var e = {},
				n = e.lib = {},
				i = n.Base = {
					extend: function (e) {
						var t = s(this);
						return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
							t.$super.init.apply(this, arguments)
						}), (t.init.prototype = t).$super = this, t
					},
					create: function () {
						var e = this.extend();
						return e.init.apply(e, arguments), e
					},
					init: function () { },
					mixIn: function (e) {
						for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
						e.hasOwnProperty("toString") && (this.toString = e.toString)
					},
					clone: function () {
						return this.init.prototype.extend(this)
					}
				},
				l = n.WordArray = i.extend({
					init: function (e, t) {
						e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length
					},
					toString: function (e) {
						return (e || a).stringify(this)
					},
					concat: function (e) {
						var t = this.words,
							s = e.words,
							r = this.sigBytes,
							n = e.sigBytes;
						if (this.clamp(), r % 4)
							for (var i = 0; i < n; i++) {
								var o = s[i >>> 2] >>> 24 - i % 4 * 8 & 255;
								t[r + i >>> 2] |= o << 24 - (r + i) % 4 * 8
							} else
							for (var a = 0; a < n; a += 4) t[r + a >>> 2] = s[a >>> 2];
						return this.sigBytes += n, this
					},
					clamp: function () {
						var e = this.words,
							t = this.sigBytes;
						e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8, e.length = d.ceil(t / 4)
					},
					clone: function () {
						var e = i.clone.call(this);
						return e.words = this.words.slice(0), e
					},
					random: function (e) {
						for (var t = [], s = 0; s < e; s += 4) t.push(function () {
							if (r) {
								if ("function" == typeof r.getRandomValues) try {
									return r.getRandomValues(new Uint32Array(1))[0]
								} catch (e) { }
								if ("function" == typeof r.randomBytes) try {
									return r.randomBytes(4).readInt32LE()
								} catch (e) { }
							}
							throw new Error("Native crypto module could not be used to get secure random number.")
						}());
						return new l.init(t, e)
					}
				}),
				o = e.enc = {},
				a = o.Hex = {
					stringify: function (e) {
						for (var t = e.words, s = e.sigBytes, r = [], n = 0; n < s; n++) {
							var i = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
							r.push((i >>> 4).toString(16)), r.push((15 & i).toString(16))
						}
						return r.join("")
					},
					parse: function (e) {
						for (var t = e.length, s = [], r = 0; r < t; r += 2) s[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
						return new l.init(s, t / 2)
					}
				},
				c = o.Latin1 = {
					stringify: function (e) {
						for (var t = e.words, s = e.sigBytes, r = [], n = 0; n < s; n++) {
							var i = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
							r.push(String.fromCharCode(i))
						}
						return r.join("")
					},
					parse: function (e) {
						for (var t = e.length, s = [], r = 0; r < t; r++) s[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
						return new l.init(s, t)
					}
				},
				u = o.Utf8 = {
					stringify: function (e) {
						try {
							return decodeURIComponent(escape(c.stringify(e)))
						} catch (e) {
							throw new Error("Malformed UTF-8 data")
						}
					},
					parse: function (e) {
						return c.parse(unescape(encodeURIComponent(e)))
					}
				},
				h = n.BufferedBlockAlgorithm = i.extend({
					reset: function () {
						this._data = new l.init, this._nDataBytes = 0
					},
					_append: function (e) {
						"string" == typeof e && (e = u.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
					},
					_process: function (e) {
						var t, s = this._data,
							r = s.words,
							n = s.sigBytes,
							i = this.blockSize,
							o = n / (4 * i),
							a = (o = e ? d.ceil(o) : d.max((0 | o) - this._minBufferSize, 0)) * i,
							e = d.min(4 * a, n);
						if (a) {
							for (var c = 0; c < a; c += i) this._doProcessBlock(r, c);
							t = r.splice(0, a), s.sigBytes -= e
						}
						return new l.init(t, e)
					},
					clone: function () {
						var e = i.clone.call(this);
						return e._data = this._data.clone(), e
					},
					_minBufferSize: 0
				}),
				m = (n.Hasher = h.extend({
					cfg: i.extend(),
					init: function (e) {
						this.cfg = this.cfg.extend(e), this.reset()
					},
					reset: function () {
						h.reset.call(this), this._doReset()
					},
					update: function (e) {
						return this._append(e), this._process(), this
					},
					finalize: function (e) {
						return e && this._append(e), this._doFinalize()
					},
					blockSize: 16,
					_createHelper: function (s) {
						return function (e, t) {
							return new s.init(t).finalize(e)
						}
					},
					_createHmacHelper: function (s) {
						return function (e, t) {
							return new m.HMAC.init(s, t).finalize(e)
						}
					}
				}), e.algo = {});
			return e
		}(Math)), ge
	}
	var fe, ve = {},
		we = {
			get exports() {
				return ve
			},
			set exports(e) {
				ve = e
			}
		};

	function Ae() {
		var e, t, n, i, s;
		return fe || (fe = 1, we.exports = (e = y(), s = (t = e).lib, n = s.Base, i = s.WordArray, (s = t.x64 = {}).Word = n.extend({
			init: function (e, t) {
				this.high = e, this.low = t
			}
		}), s.WordArray = n.extend({
			init: function (e, t) {
				e = this.words = e || [], this.sigBytes = null != t ? t : 8 * e.length
			},
			toX32: function () {
				for (var e = this.words, t = e.length, s = [], r = 0; r < t; r++) {
					var n = e[r];
					s.push(n.high), s.push(n.low)
				}
				return i.create(s, this.sigBytes)
			},
			clone: function () {
				for (var e = n.clone.call(this), t = e.words = this.words.slice(0), s = t.length, r = 0; r < s; r++) t[r] = t[r].clone();
				return e
			}
		}), e)), ve
	}
	var _e, be = {},
		Se = {
			get exports() {
				return be
			},
			set exports(e) {
				be = e
			}
		};

	function Pe() {
		var t;
		return _e || (_e = 1, Se.exports = (t = y(), function () {
			var e, n;
			"function" == typeof ArrayBuffer && (e = t.lib.WordArray, n = e.init, (e.init = function (e) {
				if ((e = (e = e instanceof ArrayBuffer ? new Uint8Array(e) : e) instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && e instanceof Uint8ClampedArray || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : e) instanceof Uint8Array) {
					for (var t = e.byteLength, s = [], r = 0; r < t; r++) s[r >>> 2] |= e[r] << 24 - r % 4 * 8;
					n.call(this, s, t)
				} else n.apply(this, arguments)
			}).prototype = e)
		}(), t.lib.WordArray)), be
	}
	var xe, Re = {},
		ke = {
			get exports() {
				return Re
			},
			set exports(e) {
				Re = e
			}
		};

	function Ie() {
		var e, n, t;
		return xe || (xe = 1, ke.exports = (e = y(), n = e.lib.WordArray, (t = e.enc).Utf16 = t.Utf16BE = {
			stringify: function (e) {
				for (var t = e.words, s = e.sigBytes, r = [], n = 0; n < s; n += 2) {
					var i = t[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
					r.push(String.fromCharCode(i))
				}
				return r.join("")
			},
			parse: function (e) {
				for (var t = e.length, s = [], r = 0; r < t; r++) s[r >>> 1] |= e.charCodeAt(r) << 16 - r % 2 * 16;
				return n.create(s, 2 * t)
			}
		}, t.Utf16LE = {
			stringify: function (e) {
				for (var t = e.words, s = e.sigBytes, r = [], n = 0; n < s; n += 2) {
					var i = o(t[n >>> 2] >>> 16 - n % 4 * 8 & 65535);
					r.push(String.fromCharCode(i))
				}
				return r.join("")
			},
			parse: function (e) {
				for (var t = e.length, s = [], r = 0; r < t; r++) s[r >>> 1] |= o(e.charCodeAt(r) << 16 - r % 2 * 16);
				return n.create(s, 2 * t)
			}
		}, e.enc.Utf16)), Re;

		function o(e) {
			return e << 8 & 4278255360 | e >>> 8 & 16711935
		}
	}
	var Ce, Te = {},
		Be = {
			get exports() {
				return Te
			},
			set exports(e) {
				Te = e
			}
		};

	function De() {
		var e, c;
		return Ce || (Ce = 1, Be.exports = (e = y(), c = e.lib.WordArray, e.enc.Base64 = {
			stringify: function (e) {
				for (var t = e.words, s = e.sigBytes, r = this._map, n = (e.clamp(), []), i = 0; i < s; i += 3)
					for (var o = (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (t[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | t[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, a = 0; a < 4 && i + .75 * a < s; a++) n.push(r.charAt(o >>> 6 * (3 - a) & 63));
				var c = r.charAt(64);
				if (c)
					for (; n.length % 4;) n.push(c);
				return n.join("")
			},
			parse: function (e) {
				var t = e.length,
					s = this._map;
				if (!(r = this._reverseMap))
					for (var r = this._reverseMap = [], n = 0; n < s.length; n++) r[s.charCodeAt(n)] = n;
				var i = s.charAt(64);
				return i && -1 !== (i = e.indexOf(i)) && (t = i), o(e, t, r)
			},
			_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
		}, e.enc.Base64)), Te;

		function o(e, t, s) {
			for (var r, n, i = [], o = 0, a = 0; a < t; a++) a % 4 && (r = s[e.charCodeAt(a - 1)] << a % 4 * 2, n = s[e.charCodeAt(a)] >>> 6 - a % 4 * 2, i[o >>> 2] |= (r | n) << 24 - o % 4 * 8, o++);
			return c.create(i, o)
		}
	}
	var Ee = {},
		Oe = {
			get exports() {
				return Ee
			},
			set exports(e) {
				Ee = e
			}
		};
	var Ne, je = {},
		Fe = {
			get exports() {
				return je
			},
			set exports(e) {
				je = e
			}
		};

	function Me() {
		return Ne || (Ne = 1, Fe.exports = function (e) {
			for (var l = Math, t = e, s = t.lib, r = s.WordArray, n = s.Hasher, i = t.algo, R = [], o = 0; o < 64; o++) R[o] = l.abs(l.sin(o + 1)) * 4294967296 | 0;
			var a = i.MD5 = n.extend({
				_doReset: function () {
					this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878])
				},
				_doProcessBlock: function (e, t) {
					for (var s = 0; s < 16; s++) {
						var r = t + s;
						var n = e[r];
						e[r] = (n << 8 | n >>> 24) & 16711935 | (n << 24 | n >>> 8) & 4278255360
					}
					var i = this._hash.words;
					var o = e[t + 0];
					var a = e[t + 1];
					var c = e[t + 2];
					var d = e[t + 3];
					var l = e[t + 4];
					var u = e[t + 5];
					var h = e[t + 6];
					var m = e[t + 7];
					var p = e[t + 8];
					var g = e[t + 9];
					var y = e[t + 10];
					var f = e[t + 11];
					var v = e[t + 12];
					var w = e[t + 13];
					var A = e[t + 14];
					var _ = e[t + 15];
					var b = i[0];
					var S = i[1];
					var P = i[2];
					var x = i[3];
					b = k(b, S, P, x, o, 7, R[0]);
					x = k(x, b, S, P, a, 12, R[1]);
					P = k(P, x, b, S, c, 17, R[2]);
					S = k(S, P, x, b, d, 22, R[3]);
					b = k(b, S, P, x, l, 7, R[4]);
					x = k(x, b, S, P, u, 12, R[5]);
					P = k(P, x, b, S, h, 17, R[6]);
					S = k(S, P, x, b, m, 22, R[7]);
					b = k(b, S, P, x, p, 7, R[8]);
					x = k(x, b, S, P, g, 12, R[9]);
					P = k(P, x, b, S, y, 17, R[10]);
					S = k(S, P, x, b, f, 22, R[11]);
					b = k(b, S, P, x, v, 7, R[12]);
					x = k(x, b, S, P, w, 12, R[13]);
					P = k(P, x, b, S, A, 17, R[14]);
					S = k(S, P, x, b, _, 22, R[15]);
					b = I(b, S, P, x, a, 5, R[16]);
					x = I(x, b, S, P, h, 9, R[17]);
					P = I(P, x, b, S, f, 14, R[18]);
					S = I(S, P, x, b, o, 20, R[19]);
					b = I(b, S, P, x, u, 5, R[20]);
					x = I(x, b, S, P, y, 9, R[21]);
					P = I(P, x, b, S, _, 14, R[22]);
					S = I(S, P, x, b, l, 20, R[23]);
					b = I(b, S, P, x, g, 5, R[24]);
					x = I(x, b, S, P, A, 9, R[25]);
					P = I(P, x, b, S, d, 14, R[26]);
					S = I(S, P, x, b, p, 20, R[27]);
					b = I(b, S, P, x, w, 5, R[28]);
					x = I(x, b, S, P, c, 9, R[29]);
					P = I(P, x, b, S, m, 14, R[30]);
					S = I(S, P, x, b, v, 20, R[31]);
					b = C(b, S, P, x, u, 4, R[32]);
					x = C(x, b, S, P, p, 11, R[33]);
					P = C(P, x, b, S, f, 16, R[34]);
					S = C(S, P, x, b, A, 23, R[35]);
					b = C(b, S, P, x, a, 4, R[36]);
					x = C(x, b, S, P, l, 11, R[37]);
					P = C(P, x, b, S, m, 16, R[38]);
					S = C(S, P, x, b, y, 23, R[39]);
					b = C(b, S, P, x, w, 4, R[40]);
					x = C(x, b, S, P, o, 11, R[41]);
					P = C(P, x, b, S, d, 16, R[42]);
					S = C(S, P, x, b, h, 23, R[43]);
					b = C(b, S, P, x, g, 4, R[44]);
					x = C(x, b, S, P, v, 11, R[45]);
					P = C(P, x, b, S, _, 16, R[46]);
					S = C(S, P, x, b, c, 23, R[47]);
					b = T(b, S, P, x, o, 6, R[48]);
					x = T(x, b, S, P, m, 10, R[49]);
					P = T(P, x, b, S, A, 15, R[50]);
					S = T(S, P, x, b, u, 21, R[51]);
					b = T(b, S, P, x, v, 6, R[52]);
					x = T(x, b, S, P, d, 10, R[53]);
					P = T(P, x, b, S, y, 15, R[54]);
					S = T(S, P, x, b, a, 21, R[55]);
					b = T(b, S, P, x, p, 6, R[56]);
					x = T(x, b, S, P, _, 10, R[57]);
					P = T(P, x, b, S, h, 15, R[58]);
					S = T(S, P, x, b, w, 21, R[59]);
					b = T(b, S, P, x, l, 6, R[60]);
					x = T(x, b, S, P, f, 10, R[61]);
					P = T(P, x, b, S, c, 15, R[62]);
					S = T(S, P, x, b, g, 21, R[63]);
					i[0] = i[0] + b | 0;
					i[1] = i[1] + S | 0;
					i[2] = i[2] + P | 0;
					i[3] = i[3] + x | 0
				},
				_doFinalize: function () {
					var e = this._data;
					var t = e.words;
					var s = this._nDataBytes * 8;
					var r = e.sigBytes * 8;
					t[r >>> 5] |= 128 << 24 - r % 32;
					var n = l.floor(s / 4294967296);
					var i = s;
					t[(r + 64 >>> 9 << 4) + 15] = (n << 8 | n >>> 24) & 16711935 | (n << 24 | n >>> 8) & 4278255360;
					t[(r + 64 >>> 9 << 4) + 14] = (i << 8 | i >>> 24) & 16711935 | (i << 24 | i >>> 8) & 4278255360;
					e.sigBytes = (t.length + 1) * 4;
					this._process();
					var o = this._hash;
					var a = o.words;
					for (var c = 0; c < 4; c++) {
						var d = a[c];
						a[c] = (d << 8 | d >>> 24) & 16711935 | (d << 24 | d >>> 8) & 4278255360
					}
					return o
				},
				clone: function () {
					var e = n.clone.call(this);
					e._hash = this._hash.clone();
					return e
				}
			});

			function k(e, t, s, r, n, i, o) {
				var a = e + (t & s | ~t & r) + n + o;
				return (a << i | a >>> 32 - i) + t
			}

			function I(e, t, s, r, n, i, o) {
				var a = e + (t & r | s & ~r) + n + o;
				return (a << i | a >>> 32 - i) + t
			}

			function C(e, t, s, r, n, i, o) {
				var a = e + (t ^ s ^ r) + n + o;
				return (a << i | a >>> 32 - i) + t
			}

			function T(e, t, s, r, n, i, o) {
				var a = e + (s ^ (t | ~r)) + n + o;
				return (a << i | a >>> 32 - i) + t
			}
			return t.MD5 = n._createHelper(a), t.HmacMD5 = n._createHmacHelper(a), e.MD5
		}(y())), je
	}
	var qe, Le = {},
		Ue = {
			get exports() {
				return Le
			},
			set exports(e) {
				Le = e
			}
		};

	function He() {
		var e, t, s, r, l, n;
		return qe || (qe = 1, Ue.exports = (e = y(), n = (t = e).lib, s = n.WordArray, r = n.Hasher, n = t.algo, l = [], n = n.SHA1 = r.extend({
			_doReset: function () {
				this._hash = new s.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
			},
			_doProcessBlock: function (e, t) {
				for (var s = this._hash.words, r = s[0], n = s[1], i = s[2], o = s[3], a = s[4], c = 0; c < 80; c++) {
					c < 16 ? l[c] = 0 | e[t + c] : (d = l[c - 3] ^ l[c - 8] ^ l[c - 14] ^ l[c - 16], l[c] = d << 1 | d >>> 31);
					var d = (r << 5 | r >>> 27) + a + l[c];
					d += c < 20 ? 1518500249 + (n & i | ~n & o) : c < 40 ? 1859775393 + (n ^ i ^ o) : c < 60 ? (n & i | n & o | i & o) - 1894007588 : (n ^ i ^ o) - 899497514, a = o, o = i, i = n << 30 | n >>> 2, n = r, r = d
				}
				s[0] = s[0] + r | 0, s[1] = s[1] + n | 0, s[2] = s[2] + i | 0, s[3] = s[3] + o | 0, s[4] = s[4] + a | 0
			},
			_doFinalize: function () {
				var e = this._data,
					t = e.words,
					s = 8 * this._nDataBytes,
					r = 8 * e.sigBytes;
				return t[r >>> 5] |= 128 << 24 - r % 32, t[14 + (64 + r >>> 9 << 4)] = Math.floor(s / 4294967296), t[15 + (64 + r >>> 9 << 4)] = s, e.sigBytes = 4 * t.length, this._process(), this._hash
			},
			clone: function () {
				var e = r.clone.call(this);
				return e._hash = this._hash.clone(), e
			}
		}), t.SHA1 = r._createHelper(n), t.HmacSHA1 = r._createHmacHelper(n), e.SHA1)), Le
	}
	var ze, We = {},
		$e = {
			get exports() {
				return We
			},
			set exports(e) {
				We = e
			}
		};

	function Ge() {
		return ze || (ze = 1, $e.exports = function (e) {
			var n = Math,
				t = e,
				s = t.lib,
				r = s.WordArray,
				i = s.Hasher,
				o = t.algo,
				a = [],
				b = [];

			function c(e) {
				var t = n.sqrt(e);
				for (var s = 2; s <= t; s++)
					if (!(e % s)) return false;
				return true
			}

			function d(e) {
				return (e - (e | 0)) * 4294967296 | 0
			}
			var l = 2,
				u = 0;
			while (u < 64) {
				if (c(l)) {
					if (u < 8) a[u] = d(n.pow(l, 1 / 2));
					b[u] = d(n.pow(l, 1 / 3));
					u++
				}
				l++
			}
			var S = [],
				h = o.SHA256 = i.extend({
					_doReset: function () {
						this._hash = new r.init(a.slice(0))
					},
					_doProcessBlock: function (e, t) {
						var s = this._hash.words;
						var r = s[0];
						var n = s[1];
						var i = s[2];
						var o = s[3];
						var a = s[4];
						var c = s[5];
						var d = s[6];
						var l = s[7];
						for (var u = 0; u < 64; u++) {
							if (u < 16) S[u] = e[t + u] | 0;
							else {
								var h = S[u - 15];
								var m = (h << 25 | h >>> 7) ^ (h << 14 | h >>> 18) ^ h >>> 3;
								var p = S[u - 2];
								var g = (p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10;
								S[u] = m + S[u - 7] + g + S[u - 16]
							}
							var y = a & c ^ ~a & d;
							var f = r & n ^ r & i ^ n & i;
							var v = (r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22);
							var w = (a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25);
							var A = l + w + y + b[u] + S[u];
							var _ = v + f;
							l = d;
							d = c;
							c = a;
							a = o + A | 0;
							o = i;
							i = n;
							n = r;
							r = A + _ | 0
						}
						s[0] = s[0] + r | 0;
						s[1] = s[1] + n | 0;
						s[2] = s[2] + i | 0;
						s[3] = s[3] + o | 0;
						s[4] = s[4] + a | 0;
						s[5] = s[5] + c | 0;
						s[6] = s[6] + d | 0;
						s[7] = s[7] + l | 0
					},
					_doFinalize: function () {
						var e = this._data;
						var t = e.words;
						var s = this._nDataBytes * 8;
						var r = e.sigBytes * 8;
						t[r >>> 5] |= 128 << 24 - r % 32;
						t[(r + 64 >>> 9 << 4) + 14] = n.floor(s / 4294967296);
						t[(r + 64 >>> 9 << 4) + 15] = s;
						e.sigBytes = t.length * 4;
						this._process();
						return this._hash
					},
					clone: function () {
						var e = i.clone.call(this);
						e._hash = this._hash.clone();
						return e
					}
				});
			return t.SHA256 = i._createHelper(h), t.HmacSHA256 = i._createHmacHelper(h), e.SHA256
		}(y())), We
	}
	var Ke = {},
		Ve = {
			get exports() {
				return Ke
			},
			set exports(e) {
				Ke = e
			}
		};
	var Ye, Je = {},
		Xe = {
			get exports() {
				return Je
			},
			set exports(e) {
				Je = e
			}
		};

	function Qe() {
		return Ye || (Ye = 1, Xe.exports = function (e) {
			var t = e,
				s, r = t.lib.Hasher,
				n = t.x64,
				i = n.Word,
				o = n.WordArray,
				a = t.algo;

			function c() {
				return i.create.apply(i, arguments)
			}
			for (var Pe = [c(1116352408, 3609767458), c(1899447441, 602891725), c(3049323471, 3964484399), c(3921009573, 2173295548), c(961987163, 4081628472), c(1508970993, 3053834265), c(2453635748, 2937671579), c(2870763221, 3664609560), c(3624381080, 2734883394), c(310598401, 1164996542), c(607225278, 1323610764), c(1426881987, 3590304994), c(1925078388, 4068182383), c(2162078206, 991336113), c(2614888103, 633803317), c(3248222580, 3479774868), c(3835390401, 2666613458), c(4022224774, 944711139), c(264347078, 2341262773), c(604807628, 2007800933), c(770255983, 1495990901), c(1249150122, 1856431235), c(1555081692, 3175218132), c(1996064986, 2198950837), c(2554220882, 3999719339), c(2821834349, 766784016), c(2952996808, 2566594879), c(3210313671, 3203337956), c(3336571891, 1034457026), c(3584528711, 2466948901), c(113926993, 3758326383), c(338241895, 168717936), c(666307205, 1188179964), c(773529912, 1546045734), c(1294757372, 1522805485), c(1396182291, 2643833823), c(1695183700, 2343527390), c(1986661051, 1014477480), c(2177026350, 1206759142), c(2456956037, 344077627), c(2730485921, 1290863460), c(2820302411, 3158454273), c(3259730800, 3505952657), c(3345764771, 106217008), c(3516065817, 3606008344), c(3600352804, 1432725776), c(4094571909, 1467031594), c(275423344, 851169720), c(430227734, 3100823752), c(506948616, 1363258195), c(659060556, 3750685593), c(883997877, 3785050280), c(958139571, 3318307427), c(1322822218, 3812723403), c(1537002063, 2003034995), c(1747873779, 3602036899), c(1955562222, 1575990012), c(2024104815, 1125592928), c(2227730452, 2716904306), c(2361852424, 442776044), c(2428436474, 593698344), c(2756734187, 3733110249), c(3204031479, 2999351573), c(3329325298, 3815920427), c(3391569614, 3928383900), c(3515267271, 566280711), c(3940187606, 3454069534), c(4118630271, 4000239992), c(116418474, 1914138554), c(174292421, 2731055270), c(289380356, 3203993006), c(460393269, 320620315), c(685471733, 587496836), c(852142971, 1086792851), c(1017036298, 365543100), c(1126000580, 2618297676), c(1288033470, 3409855158), c(1501505948, 4234509866), c(1607167915, 987167468), c(1816402316, 1246189591)], xe = [], d = 0; d < 80; d++) xe[d] = c();
			var l = a.SHA512 = r.extend({
				_doReset: function () {
					this._hash = new o.init([new i.init(1779033703, 4089235720), new i.init(3144134277, 2227873595), new i.init(1013904242, 4271175723), new i.init(2773480762, 1595750129), new i.init(1359893119, 2917565137), new i.init(2600822924, 725511199), new i.init(528734635, 4215389547), new i.init(1541459225, 327033209)])
				},
				_doProcessBlock: function (j, F) {
					var e = this._hash.words;
					var t = e[0];
					var s = e[1];
					var r = e[2];
					var n = e[3];
					var i = e[4];
					var o = e[5];
					var a = e[6];
					var c = e[7];
					var M = t.high;
					var d = t.low;
					var q = s.high;
					var l = s.low;
					var L = r.high;
					var u = r.low;
					var U = n.high;
					var h = n.low;
					var H = i.high;
					var m = i.low;
					var z = o.high;
					var p = o.low;
					var W = a.high;
					var $ = a.low;
					var G = c.high;
					var K = c.low;
					var g = M;
					var y = d;
					var f = q;
					var v = l;
					var w = L;
					var A = u;
					var V = U;
					var _ = h;
					var b = H;
					var S = m;
					var Y = z;
					var P = p;
					var J = W;
					var x = $;
					var X = G;
					var R = K;
					for (var k = 0; k < 80; k++) {
						var I;
						var C;
						var Q = xe[k];
						if (k < 16) {
							C = Q.high = j[F + k * 2] | 0;
							I = Q.low = j[F + k * 2 + 1] | 0
						} else {
							var Z = xe[k - 15];
							var T = Z.high;
							var B = Z.low;
							var ee = (T >>> 1 | B << 31) ^ (T >>> 8 | B << 24) ^ T >>> 7;
							var te = (B >>> 1 | T << 31) ^ (B >>> 8 | T << 24) ^ (B >>> 7 | T << 25);
							var se = xe[k - 2];
							var D = se.high;
							var E = se.low;
							var re = (D >>> 19 | E << 13) ^ (D << 3 | E >>> 29) ^ D >>> 6;
							var ne = (E >>> 19 | D << 13) ^ (E << 3 | D >>> 29) ^ (E >>> 6 | D << 26);
							var ie = xe[k - 7];
							var oe = ie.high;
							var ae = ie.low;
							var ce = xe[k - 16];
							var de = ce.high;
							var le = ce.low;
							I = te + ae;
							C = ee + oe + (I >>> 0 < te >>> 0 ? 1 : 0);
							I = I + ne;
							C = C + re + (I >>> 0 < ne >>> 0 ? 1 : 0);
							I = I + le;
							C = C + de + (I >>> 0 < le >>> 0 ? 1 : 0);
							Q.high = C;
							Q.low = I
						}
						var ue = b & Y ^ ~b & J;
						var he = S & P ^ ~S & x;
						var me = g & f ^ g & w ^ f & w;
						var pe = y & v ^ y & A ^ v & A;
						var ge = (g >>> 28 | y << 4) ^ (g << 30 | y >>> 2) ^ (g << 25 | y >>> 7);
						var ye = (y >>> 28 | g << 4) ^ (y << 30 | g >>> 2) ^ (y << 25 | g >>> 7);
						var fe = (b >>> 14 | S << 18) ^ (b >>> 18 | S << 14) ^ (b << 23 | S >>> 9);
						var ve = (S >>> 14 | b << 18) ^ (S >>> 18 | b << 14) ^ (S << 23 | b >>> 9);
						var we = Pe[k];
						var Ae = we.high;
						var _e = we.low;
						var O = R + ve;
						var N = X + fe + (O >>> 0 < R >>> 0 ? 1 : 0);
						var O = O + he;
						var N = N + ue + (O >>> 0 < he >>> 0 ? 1 : 0);
						var O = O + _e;
						var N = N + Ae + (O >>> 0 < _e >>> 0 ? 1 : 0);
						var O = O + I;
						var N = N + C + (O >>> 0 < I >>> 0 ? 1 : 0);
						var be = ye + pe;
						var Se = ge + me + (be >>> 0 < ye >>> 0 ? 1 : 0);
						X = J;
						R = x;
						J = Y;
						x = P;
						Y = b;
						P = S;
						S = _ + O | 0;
						b = V + N + (S >>> 0 < _ >>> 0 ? 1 : 0) | 0;
						V = w;
						_ = A;
						w = f;
						A = v;
						f = g;
						v = y;
						y = O + be | 0;
						g = N + Se + (y >>> 0 < O >>> 0 ? 1 : 0) | 0
					}
					d = t.low = d + y;
					t.high = M + g + (d >>> 0 < y >>> 0 ? 1 : 0);
					l = s.low = l + v;
					s.high = q + f + (l >>> 0 < v >>> 0 ? 1 : 0);
					u = r.low = u + A;
					r.high = L + w + (u >>> 0 < A >>> 0 ? 1 : 0);
					h = n.low = h + _;
					n.high = U + V + (h >>> 0 < _ >>> 0 ? 1 : 0);
					m = i.low = m + S;
					i.high = H + b + (m >>> 0 < S >>> 0 ? 1 : 0);
					p = o.low = p + P;
					o.high = z + Y + (p >>> 0 < P >>> 0 ? 1 : 0);
					$ = a.low = $ + x;
					a.high = W + J + ($ >>> 0 < x >>> 0 ? 1 : 0);
					K = c.low = K + R;
					c.high = G + X + (K >>> 0 < R >>> 0 ? 1 : 0)
				},
				_doFinalize: function () {
					var e = this._data;
					var t = e.words;
					var s = this._nDataBytes * 8;
					var r = e.sigBytes * 8;
					t[r >>> 5] |= 128 << 24 - r % 32;
					t[(r + 128 >>> 10 << 5) + 30] = Math.floor(s / 4294967296);
					t[(r + 128 >>> 10 << 5) + 31] = s;
					e.sigBytes = t.length * 4;
					this._process();
					var n = this._hash.toX32();
					return n
				},
				clone: function () {
					var e = r.clone.call(this);
					e._hash = this._hash.clone();
					return e
				},
				blockSize: 1024 / 32
			});
			return t.SHA512 = r._createHelper(l), t.HmacSHA512 = r._createHmacHelper(l), e.SHA512
		}(y(), Ae())), Je
	}
	var Ze = {},
		et = {
			get exports() {
				return Ze
			},
			set exports(e) {
				Ze = e
			}
		};
	var tt, st = {},
		rt = {
			get exports() {
				return st
			},
			set exports(e) {
				st = e
			}
		};

	function nt() {
		return tt || (tt = 1, rt.exports = function (e) {
			for (var h = Math, t = e, s = t.lib, m = s.WordArray, r = s.Hasher, n, i = t.x64.Word, o = t.algo, C = [], T = [], B = [], a = 1, c = 0, d = 0; d < 24; d++) {
				C[a + 5 * c] = (d + 1) * (d + 2) / 2 % 64;
				var l = c % 5;
				var u = (2 * a + 3 * c) % 5;
				a = l;
				c = u
			}
			for (var a = 0; a < 5; a++)
				for (var c = 0; c < 5; c++) T[a + 5 * c] = c + (2 * a + 3 * c) % 5 * 5;
			for (var p = 1, g = 0; g < 24; g++) {
				var y = 0;
				var f = 0;
				for (var v = 0; v < 7; v++) {
					if (p & 1) {
						var w = (1 << v) - 1;
						if (w < 32) f ^= 1 << w;
						else y ^= 1 << w - 32
					}
					if (p & 128) p = p << 1 ^ 113;
					else p <<= 1
				}
				B[g] = i.create(y, f)
			}
			for (var D = [], A = 0; A < 25; A++) D[A] = i.create();
			var _ = o.SHA3 = r.extend({
				cfg: r.cfg.extend({
					outputLength: 512
				}),
				_doReset: function () {
					var e = this._state = [];
					for (var t = 0; t < 25; t++) e[t] = new i.init;
					this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
				},
				_doProcessBlock: function (e, t) {
					var s = this._state;
					var r = this.blockSize / 2;
					for (var n = 0; n < r; n++) {
						var i = e[t + 2 * n];
						var o = e[t + 2 * n + 1];
						i = (i << 8 | i >>> 24) & 16711935 | (i << 24 | i >>> 8) & 4278255360;
						o = (o << 8 | o >>> 24) & 16711935 | (o << 24 | o >>> 8) & 4278255360;
						var a = s[n];
						a.high ^= o;
						a.low ^= i
					}
					for (var c = 0; c < 24; c++) {
						for (var d = 0; d < 5; d++) {
							var l = 0,
								u = 0;
							for (var h = 0; h < 5; h++) {
								var a = s[d + 5 * h];
								l ^= a.high;
								u ^= a.low
							}
							var m = D[d];
							m.high = l;
							m.low = u
						}
						for (var d = 0; d < 5; d++) {
							var p = D[(d + 4) % 5];
							var g = D[(d + 1) % 5];
							var y = g.high;
							var f = g.low;
							var l = p.high ^ (y << 1 | f >>> 31);
							var u = p.low ^ (f << 1 | y >>> 31);
							for (var h = 0; h < 5; h++) {
								var a = s[d + 5 * h];
								a.high ^= l;
								a.low ^= u
							}
						}
						for (var v = 1; v < 25; v++) {
							var l;
							var u;
							var a = s[v];
							var w = a.high;
							var A = a.low;
							var _ = C[v];
							if (_ < 32) {
								l = w << _ | A >>> 32 - _;
								u = A << _ | w >>> 32 - _
							} else {
								l = A << _ - 32 | w >>> 64 - _;
								u = w << _ - 32 | A >>> 64 - _
							}
							var b = D[T[v]];
							b.high = l;
							b.low = u
						}
						var S = D[0];
						var P = s[0];
						S.high = P.high;
						S.low = P.low;
						for (var d = 0; d < 5; d++)
							for (var h = 0; h < 5; h++) {
								var v = d + 5 * h;
								var a = s[v];
								var x = D[v];
								var R = D[(d + 1) % 5 + 5 * h];
								var k = D[(d + 2) % 5 + 5 * h];
								a.high = x.high ^ ~R.high & k.high;
								a.low = x.low ^ ~R.low & k.low
							}
						var a = s[0];
						var I = B[c];
						a.high ^= I.high;
						a.low ^= I.low
					}
				},
				_doFinalize: function () {
					var e = this._data;
					var t = e.words;
					this._nDataBytes * 8;
					var s = e.sigBytes * 8;
					var r = this.blockSize * 32;
					t[s >>> 5] |= 1 << 24 - s % 32;
					t[(h.ceil((s + 1) / r) * r >>> 5) - 1] |= 128;
					e.sigBytes = t.length * 4;
					this._process();
					var n = this._state;
					var i = this.cfg.outputLength / 8;
					var o = i / 8;
					var a = [];
					for (var c = 0; c < o; c++) {
						var d = n[c];
						var l = d.high;
						var u = d.low;
						l = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360;
						u = (u << 8 | u >>> 24) & 16711935 | (u << 24 | u >>> 8) & 4278255360;
						a.push(u);
						a.push(l)
					}
					return new m.init(a, i)
				},
				clone: function () {
					var e = r.clone.call(this);
					var t = e._state = this._state.slice(0);
					for (var s = 0; s < 25; s++) t[s] = t[s].clone();
					return e
				}
			});
			return t.SHA3 = r._createHelper(_), t.HmacSHA3 = r._createHmacHelper(_), e.SHA3
		}(y(), Ae())), st
	}
	var it = {},
		ot = {
			get exports() {
				return it
			},
			set exports(e) {
				it = e
			}
		};
	var at, ct = {},
		dt = {
			get exports() {
				return ct
			},
			set exports(e) {
				ct = e
			}
		};

	function lt() {
		var e, t, a;
		return at || (at = 1, dt.exports = (e = y(), t = e.lib.Base, a = e.enc.Utf8, void (e.algo.HMAC = t.extend({
			init: function (e, t) {
				e = this._hasher = new e.init, "string" == typeof t && (t = a.parse(t));
				for (var s = e.blockSize, r = 4 * s, e = ((t = t.sigBytes > r ? e.finalize(t) : t).clamp(), this._oKey = t.clone()), t = this._iKey = t.clone(), n = e.words, i = t.words, o = 0; o < s; o++) n[o] ^= 1549556828, i[o] ^= 909522486;
				e.sigBytes = t.sigBytes = r, this.reset()
			},
			reset: function () {
				var e = this._hasher;
				e.reset(), e.update(this._iKey)
			},
			update: function (e) {
				return this._hasher.update(e), this
			},
			finalize: function (e) {
				var t = this._hasher,
					e = t.finalize(e);
				return t.reset(), t.finalize(this._oKey.clone().concat(e))
			}
		})))), ct
	}
	var ut = {},
		ht = {
			get exports() {
				return ut
			},
			set exports(e) {
				ut = e
			}
		};
	var mt, pt = {},
		gt = {
			get exports() {
				return pt
			},
			set exports(e) {
				pt = e
			}
		};

	function yt() {
		var e, t, s, l, r, n, i;
		return mt || (mt = 1, gt.exports = (e = y(), He(), lt(), r = (t = e).lib, s = r.Base, l = r.WordArray, r = t.algo, n = r.MD5, i = r.EvpKDF = s.extend({
			cfg: s.extend({
				keySize: 4,
				hasher: n,
				iterations: 1
			}),
			init: function (e) {
				this.cfg = this.cfg.extend(e)
			},
			compute: function (e, t) {
				for (var s, r = this.cfg, n = r.hasher.create(), i = l.create(), o = i.words, a = r.keySize, c = r.iterations; o.length < a;) {
					s && n.update(s), s = n.update(e).finalize(t), n.reset();
					for (var d = 1; d < c; d++) s = n.finalize(s), n.reset();
					i.concat(s)
				}
				return i.sigBytes = 4 * a, i
			}
		}), t.EvpKDF = function (e, t, s) {
			return i.create(s).compute(e, t)
		}, e.EvpKDF)), pt
	}
	var ft, vt = {},
		wt = {
			get exports() {
				return vt
			},
			set exports(e) {
				vt = e
			}
		};

	function f() {
		var o, e, t, s, a, r, n, i, c, d, l, u, h, m, p;
		return ft || (ft = 1, wt.exports = (e = y(), yt(), void (e.lib.Cipher || (o = void 0, t = (e = e).lib, s = t.Base, a = t.WordArray, r = t.BufferedBlockAlgorithm, (u = e.enc).Utf8, n = u.Base64, i = e.algo.EvpKDF, c = t.Cipher = r.extend({
			cfg: s.extend(),
			createEncryptor: function (e, t) {
				return this.create(this._ENC_XFORM_MODE, e, t)
			},
			createDecryptor: function (e, t) {
				return this.create(this._DEC_XFORM_MODE, e, t)
			},
			init: function (e, t, s) {
				this.cfg = this.cfg.extend(s), this._xformMode = e, this._key = t, this.reset()
			},
			reset: function () {
				r.reset.call(this), this._doReset()
			},
			process: function (e) {
				return this._append(e), this._process()
			},
			finalize: function (e) {
				return e && this._append(e), this._doFinalize()
			},
			keySize: 4,
			ivSize: 4,
			_ENC_XFORM_MODE: 1,
			_DEC_XFORM_MODE: 2,
			_createHelper: function () {
				function n(e) {
					return "string" == typeof e ? p : h
				}
				return function (r) {
					return {
						encrypt: function (e, t, s) {
							return n(t).encrypt(r, e, t, s)
						},
						decrypt: function (e, t, s) {
							return n(t).decrypt(r, e, t, s)
						}
					}
				}
			}()
		}), t.StreamCipher = c.extend({
			_doFinalize: function () {
				return this._process(!0)
			},
			blockSize: 1
		}), u = e.mode = {}, d = t.BlockCipherMode = s.extend({
			createEncryptor: function (e, t) {
				return this.Encryptor.create(e, t)
			},
			createDecryptor: function (e, t) {
				return this.Decryptor.create(e, t)
			},
			init: function (e, t) {
				this._cipher = e, this._iv = t
			}
		}), u = u.CBC = function () {
			var e = d.extend();

			function i(e, t, s) {
				var r, n = this._iv;
				n ? (r = n, this._iv = o) : r = this._prevBlock;
				for (var i = 0; i < s; i++) e[t + i] ^= r[i]
			}
			return e.Encryptor = e.extend({
				processBlock: function (e, t) {
					var s = this._cipher,
						r = s.blockSize;
					i.call(this, e, t, r), s.encryptBlock(e, t), this._prevBlock = e.slice(t, t + r)
				}
			}), e.Decryptor = e.extend({
				processBlock: function (e, t) {
					var s = this._cipher,
						r = s.blockSize,
						n = e.slice(t, t + r);
					s.decryptBlock(e, t), i.call(this, e, t, r), this._prevBlock = n
				}
			}), e
		}(), m = (e.pad = {}).Pkcs7 = {
			pad: function (e, t) {
				for (var t = 4 * t, s = t - e.sigBytes % t, r = s << 24 | s << 16 | s << 8 | s, n = [], i = 0; i < s; i += 4) n.push(r);
				t = a.create(n, s);
				e.concat(t)
			},
			unpad: function (e) {
				var t = 255 & e.words[e.sigBytes - 1 >>> 2];
				e.sigBytes -= t
			}
		}, t.BlockCipher = c.extend({
			cfg: c.cfg.extend({
				mode: u,
				padding: m
			}),
			reset: function () {
				c.reset.call(this);
				var e, t = this.cfg,
					s = t.iv,
					t = t.mode;
				this._xformMode == this._ENC_XFORM_MODE ? e = t.createEncryptor : (e = t.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == e ? this._mode.init(this, s && s.words) : (this._mode = e.call(t, this, s && s.words), this._mode.__creator = e)
			},
			_doProcessBlock: function (e, t) {
				this._mode.processBlock(e, t)
			},
			_doFinalize: function () {
				var e, t = this.cfg.padding;
				return this._xformMode == this._ENC_XFORM_MODE ? (t.pad(this._data, this.blockSize), e = this._process(!0)) : (e = this._process(!0), t.unpad(e)), e
			},
			blockSize: 4
		}), l = t.CipherParams = s.extend({
			init: function (e) {
				this.mixIn(e)
			},
			toString: function (e) {
				return (e || this.formatter).stringify(this)
			}
		}), u = (e.format = {}).OpenSSL = {
			stringify: function (e) {
				var t = e.ciphertext,
					e = e.salt,
					e = e ? a.create([1398893684, 1701076831]).concat(e).concat(t) : t;
				return e.toString(n)
			},
			parse: function (e) {
				var t, e = n.parse(e),
					s = e.words;
				return 1398893684 == s[0] && 1701076831 == s[1] && (t = a.create(s.slice(2, 4)), s.splice(0, 4), e.sigBytes -= 16), l.create({
					ciphertext: e,
					salt: t
				})
			}
		}, h = t.SerializableCipher = s.extend({
			cfg: s.extend({
				format: u
			}),
			encrypt: function (e, t, s, r) {
				r = this.cfg.extend(r);
				var n = e.createEncryptor(s, r),
					t = n.finalize(t),
					n = n.cfg;
				return l.create({
					ciphertext: t,
					key: s,
					iv: n.iv,
					algorithm: e,
					mode: n.mode,
					padding: n.padding,
					blockSize: e.blockSize,
					formatter: r.format
				})
			},
			decrypt: function (e, t, s, r) {
				return r = this.cfg.extend(r), t = this._parse(t, r.format), e.createDecryptor(s, r).finalize(t.ciphertext)
			},
			_parse: function (e, t) {
				return "string" == typeof e ? t.parse(e, this) : e
			}
		}), m = (e.kdf = {}).OpenSSL = {
			execute: function (e, t, s, r) {
				r = r || a.random(8);
				e = i.create({
					keySize: t + s
				}).compute(e, r), s = a.create(e.words.slice(t), 4 * s);
				return e.sigBytes = 4 * t, l.create({
					key: e,
					iv: s,
					salt: r
				})
			}
		}, p = t.PasswordBasedCipher = h.extend({
			cfg: h.cfg.extend({
				kdf: m
			}),
			encrypt: function (e, t, s, r) {
				s = (r = this.cfg.extend(r)).kdf.execute(s, e.keySize, e.ivSize), r.iv = s.iv, e = h.encrypt.call(this, e, t, s.key, r);
				return e.mixIn(s), e
			},
			decrypt: function (e, t, s, r) {
				r = this.cfg.extend(r), t = this._parse(t, r.format);
				s = r.kdf.execute(s, e.keySize, e.ivSize, t.salt);
				return r.iv = s.iv, h.decrypt.call(this, e, t, s.key, r)
			}
		}))))), vt
	}
	var At, _t = {},
		bt = {
			get exports() {
				return _t
			},
			set exports(e) {
				_t = e
			}
		};

	function St() {
		var t;
		return At || (At = 1, bt.exports = (t = y(), f(), t.mode.CFB = function () {
			var e = t.lib.BlockCipherMode.extend();

			function i(e, t, s, r) {
				var n, i = this._iv;
				i ? (n = i.slice(0), this._iv = void 0) : n = this._prevBlock, r.encryptBlock(n, 0);
				for (var o = 0; o < s; o++) e[t + o] ^= n[o]
			}
			return e.Encryptor = e.extend({
				processBlock: function (e, t) {
					var s = this._cipher,
						r = s.blockSize;
					i.call(this, e, t, r, s), this._prevBlock = e.slice(t, t + r)
				}
			}), e.Decryptor = e.extend({
				processBlock: function (e, t) {
					var s = this._cipher,
						r = s.blockSize,
						n = e.slice(t, t + r);
					i.call(this, e, t, r, s), this._prevBlock = n
				}
			}), e
		}(), t.mode.CFB)), _t
	}
	var Pt, xt = {},
		Rt = {
			get exports() {
				return xt
			},
			set exports(e) {
				xt = e
			}
		};

	function kt() {
		var s;
		return Pt || (Pt = 1, Rt.exports = (s = y(), f(), s.mode.CTR = function () {
			var e = s.lib.BlockCipherMode.extend(),
				t = e.Encryptor = e.extend({
					processBlock: function (e, t) {
						var s = this._cipher,
							r = s.blockSize,
							n = this._iv,
							i = this._counter,
							o = (n && (i = this._counter = n.slice(0), this._iv = void 0), i.slice(0));
						s.encryptBlock(o, 0), i[r - 1] = i[r - 1] + 1 | 0;
						for (var a = 0; a < r; a++) e[t + a] ^= o[a]
					}
				});
			return e.Decryptor = t, e
		}(), s.mode.CTR)), xt
	}
	var It, Ct = {},
		Tt = {
			get exports() {
				return Ct
			},
			set exports(e) {
				Ct = e
			}
		};

	function Bt() {
		var s;
		return It || (It = 1, Tt.exports = (s = y(), f(), s.mode.CTRGladman = function () {
			var e = s.lib.BlockCipherMode.extend();

			function c(e) {
				var t, s, r;
				return 255 == (e >> 24 & 255) ? (s = e >> 8 & 255, r = 255 & e, 255 === (t = e >> 16 & 255) ? (t = 0, 255 === s ? (s = 0, 255 === r ? r = 0 : ++r) : ++s) : ++t, e = 0, e = (e += t << 16) + (s << 8) + r) : e += 1 << 24, e
			}
			var t = e.Encryptor = e.extend({
				processBlock: function (e, t) {
					var s = this._cipher,
						r = s.blockSize,
						n = this._iv,
						i = this._counter,
						o = (n && (i = this._counter = n.slice(0), this._iv = void 0), 0 === ((n = i)[0] = c(n[0])) && (n[1] = c(n[1])), i.slice(0));
					s.encryptBlock(o, 0);
					for (var a = 0; a < r; a++) e[t + a] ^= o[a]
				}
			});
			return e.Decryptor = t, e
		}(), s.mode.CTRGladman)), Ct
	}
	var Dt, Et = {},
		Ot = {
			get exports() {
				return Et
			},
			set exports(e) {
				Et = e
			}
		};

	function Nt() {
		var s;
		return Dt || (Dt = 1, Ot.exports = (s = y(), f(), s.mode.OFB = function () {
			var e = s.lib.BlockCipherMode.extend(),
				t = e.Encryptor = e.extend({
					processBlock: function (e, t) {
						var s = this._cipher,
							r = s.blockSize,
							n = this._iv,
							i = this._keystream;
						n && (i = this._keystream = n.slice(0), this._iv = void 0), s.encryptBlock(i, 0);
						for (var o = 0; o < r; o++) e[t + o] ^= i[o]
					}
				});
			return e.Decryptor = t, e
		}(), s.mode.OFB)), Et
	}
	var jt = {},
		Ft = {
			get exports() {
				return jt
			},
			set exports(e) {
				jt = e
			}
		};
	var Mt, qt = {},
		Lt = {
			get exports() {
				return qt
			},
			set exports(e) {
				qt = e
			}
		};
	var Ut, Ht = {},
		zt = {
			get exports() {
				return Ht
			},
			set exports(e) {
				Ht = e
			}
		};
	var Wt, $t = {},
		Gt = {
			get exports() {
				return $t
			},
			set exports(e) {
				$t = e
			}
		};
	var Kt, Vt = {},
		Yt = {
			get exports() {
				return Vt
			},
			set exports(e) {
				Vt = e
			}
		};
	var Jt, Xt = {},
		Qt = {
			get exports() {
				return Xt
			},
			set exports(e) {
				Xt = e
			}
		};
	var Zt, es = {},
		ts = {
			get exports() {
				return es
			},
			set exports(e) {
				es = e
			}
		};
	var ss, rs = {},
		ns = {
			get exports() {
				return rs
			},
			set exports(e) {
				rs = e
			}
		};

	function is() {
		return ss || (ss = 1, ns.exports = function (e) {
			for (var t = e, s, r = t.lib.BlockCipher, n = t.algo, l = [], i = [], o = [], a = [], c = [], d = [], u = [], h = [], m = [], p = [], g = [], y = 0; y < 256; y++)
				if (y < 128) g[y] = y << 1;
				else g[y] = y << 1 ^ 283;
			for (var f = 0, v = 0, y = 0; y < 256; y++) {
				var w = v ^ v << 1 ^ v << 2 ^ v << 3 ^ v << 4;
				w = w >>> 8 ^ w & 255 ^ 99;
				l[f] = w;
				i[w] = f;
				var A = g[f];
				var _ = g[A];
				var b = g[_];
				var S = g[w] * 257 ^ w * 16843008;
				o[f] = S << 24 | S >>> 8;
				a[f] = S << 16 | S >>> 16;
				c[f] = S << 8 | S >>> 24;
				d[f] = S;
				var S = b * 16843009 ^ _ * 65537 ^ A * 257 ^ f * 16843008;
				u[w] = S << 24 | S >>> 8;
				h[w] = S << 16 | S >>> 16;
				m[w] = S << 8 | S >>> 24;
				p[w] = S;
				if (!f) f = v = 1;
				else {
					f = A ^ g[g[g[b ^ A]]];
					v ^= g[g[v]]
				}
			}
			var P = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
				x = n.AES = r.extend({
					_doReset: function () {
						var e;
						if (this._nRounds && this._keyPriorReset === this._key) return;
						var t = this._keyPriorReset = this._key;
						var s = t.words;
						var r = t.sigBytes / 4;
						var n = this._nRounds = r + 6;
						var i = (n + 1) * 4;
						var o = this._keySchedule = [];
						for (var a = 0; a < i; a++)
							if (a < r) o[a] = s[a];
							else {
								e = o[a - 1];
								if (!(a % r)) {
									e = e << 8 | e >>> 24;
									e = l[e >>> 24] << 24 | l[e >>> 16 & 255] << 16 | l[e >>> 8 & 255] << 8 | l[e & 255];
									e ^= P[a / r | 0] << 24
								} else if (r > 6 && a % r == 4) e = l[e >>> 24] << 24 | l[e >>> 16 & 255] << 16 | l[e >>> 8 & 255] << 8 | l[e & 255];
								o[a] = o[a - r] ^ e
							} var c = this._invKeySchedule = [];
						for (var d = 0; d < i; d++) {
							var a = i - d;
							if (d % 4) var e = o[a];
							else var e = o[a - 4];
							if (d < 4 || a <= 4) c[d] = e;
							else c[d] = u[l[e >>> 24]] ^ h[l[e >>> 16 & 255]] ^ m[l[e >>> 8 & 255]] ^ p[l[e & 255]]
						}
					},
					encryptBlock: function (e, t) {
						this._doCryptBlock(e, t, this._keySchedule, o, a, c, d, l)
					},
					decryptBlock: function (e, t) {
						var s = e[t + 1];
						e[t + 1] = e[t + 3];
						e[t + 3] = s;
						this._doCryptBlock(e, t, this._invKeySchedule, u, h, m, p, i);
						var s = e[t + 1];
						e[t + 1] = e[t + 3];
						e[t + 3] = s
					},
					_doCryptBlock: function (e, t, s, r, n, i, o, a) {
						var c = this._nRounds;
						var d = e[t] ^ s[0];
						var l = e[t + 1] ^ s[1];
						var u = e[t + 2] ^ s[2];
						var h = e[t + 3] ^ s[3];
						var m = 4;
						for (var p = 1; p < c; p++) {
							var g = r[d >>> 24] ^ n[l >>> 16 & 255] ^ i[u >>> 8 & 255] ^ o[h & 255] ^ s[m++];
							var y = r[l >>> 24] ^ n[u >>> 16 & 255] ^ i[h >>> 8 & 255] ^ o[d & 255] ^ s[m++];
							var f = r[u >>> 24] ^ n[h >>> 16 & 255] ^ i[d >>> 8 & 255] ^ o[l & 255] ^ s[m++];
							var v = r[h >>> 24] ^ n[d >>> 16 & 255] ^ i[l >>> 8 & 255] ^ o[u & 255] ^ s[m++];
							d = g;
							l = y;
							u = f;
							h = v
						}
						var g = (a[d >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[h & 255]) ^ s[m++];
						var y = (a[l >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[d & 255]) ^ s[m++];
						var f = (a[u >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[d >>> 8 & 255] << 8 | a[l & 255]) ^ s[m++];
						var v = (a[h >>> 24] << 24 | a[d >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[u & 255]) ^ s[m++];
						e[t] = g;
						e[t + 1] = y;
						e[t + 2] = f;
						e[t + 3] = v
					},
					keySize: 256 / 32
				});
			return t.AES = r._createHelper(x), e.AES
		}(y(), (De(), Me(), yt(), f()))), rs
	}
	var os, as = {},
		cs = {
			get exports() {
				return as
			},
			set exports(e) {
				as = e
			}
		};

	function ds() {
		var e, t, r, s, d, l, u, h, m, n, i;
		return os || (os = 1, cs.exports = (e = y(), De(), Me(), yt(), f(), s = (t = e).lib, r = s.WordArray, s = s.BlockCipher, i = t.algo, d = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4], l = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32], u = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], h = [{
			0: 8421888,
			268435456: 32768,
			536870912: 8421378,
			805306368: 2,
			1073741824: 512,
			1342177280: 8421890,
			1610612736: 8389122,
			1879048192: 8388608,
			2147483648: 514,
			2415919104: 8389120,
			2684354560: 33280,
			2952790016: 8421376,
			3221225472: 32770,
			3489660928: 8388610,
			3758096384: 0,
			4026531840: 33282,
			134217728: 0,
			402653184: 8421890,
			671088640: 33282,
			939524096: 32768,
			1207959552: 8421888,
			1476395008: 512,
			1744830464: 8421378,
			2013265920: 2,
			2281701376: 8389120,
			2550136832: 33280,
			2818572288: 8421376,
			3087007744: 8389122,
			3355443200: 8388610,
			3623878656: 32770,
			3892314112: 514,
			4160749568: 8388608,
			1: 32768,
			268435457: 2,
			536870913: 8421888,
			805306369: 8388608,
			1073741825: 8421378,
			1342177281: 33280,
			1610612737: 512,
			1879048193: 8389122,
			2147483649: 8421890,
			2415919105: 8421376,
			2684354561: 8388610,
			2952790017: 33282,
			3221225473: 514,
			3489660929: 8389120,
			3758096385: 32770,
			4026531841: 0,
			134217729: 8421890,
			402653185: 8421376,
			671088641: 8388608,
			939524097: 512,
			1207959553: 32768,
			1476395009: 8388610,
			1744830465: 2,
			2013265921: 33282,
			2281701377: 32770,
			2550136833: 8389122,
			2818572289: 514,
			3087007745: 8421888,
			3355443201: 8389120,
			3623878657: 0,
			3892314113: 33280,
			4160749569: 8421378
		}, {
			0: 1074282512,
			16777216: 16384,
			33554432: 524288,
			50331648: 1074266128,
			67108864: 1073741840,
			83886080: 1074282496,
			100663296: 1073758208,
			117440512: 16,
			134217728: 540672,
			150994944: 1073758224,
			167772160: 1073741824,
			184549376: 540688,
			201326592: 524304,
			218103808: 0,
			234881024: 16400,
			251658240: 1074266112,
			8388608: 1073758208,
			25165824: 540688,
			41943040: 16,
			58720256: 1073758224,
			75497472: 1074282512,
			92274688: 1073741824,
			109051904: 524288,
			125829120: 1074266128,
			142606336: 524304,
			159383552: 0,
			176160768: 16384,
			192937984: 1074266112,
			209715200: 1073741840,
			226492416: 540672,
			243269632: 1074282496,
			260046848: 16400,
			268435456: 0,
			285212672: 1074266128,
			301989888: 1073758224,
			318767104: 1074282496,
			335544320: 1074266112,
			352321536: 16,
			369098752: 540688,
			385875968: 16384,
			402653184: 16400,
			419430400: 524288,
			436207616: 524304,
			452984832: 1073741840,
			469762048: 540672,
			486539264: 1073758208,
			503316480: 1073741824,
			520093696: 1074282512,
			276824064: 540688,
			293601280: 524288,
			310378496: 1074266112,
			327155712: 16384,
			343932928: 1073758208,
			360710144: 1074282512,
			377487360: 16,
			394264576: 1073741824,
			411041792: 1074282496,
			427819008: 1073741840,
			444596224: 1073758224,
			461373440: 524304,
			478150656: 0,
			494927872: 16400,
			511705088: 1074266128,
			528482304: 540672
		}, {
			0: 260,
			1048576: 0,
			2097152: 67109120,
			3145728: 65796,
			4194304: 65540,
			5242880: 67108868,
			6291456: 67174660,
			7340032: 67174400,
			8388608: 67108864,
			9437184: 67174656,
			10485760: 65792,
			11534336: 67174404,
			12582912: 67109124,
			13631488: 65536,
			14680064: 4,
			15728640: 256,
			524288: 67174656,
			1572864: 67174404,
			2621440: 0,
			3670016: 67109120,
			4718592: 67108868,
			5767168: 65536,
			6815744: 65540,
			7864320: 260,
			8912896: 4,
			9961472: 256,
			11010048: 67174400,
			12058624: 65796,
			13107200: 65792,
			14155776: 67109124,
			15204352: 67174660,
			16252928: 67108864,
			16777216: 67174656,
			17825792: 65540,
			18874368: 65536,
			19922944: 67109120,
			20971520: 256,
			22020096: 67174660,
			23068672: 67108868,
			24117248: 0,
			25165824: 67109124,
			26214400: 67108864,
			27262976: 4,
			28311552: 65792,
			29360128: 67174400,
			30408704: 260,
			31457280: 65796,
			32505856: 67174404,
			17301504: 67108864,
			18350080: 260,
			19398656: 67174656,
			20447232: 0,
			21495808: 65540,
			22544384: 67109120,
			23592960: 256,
			24641536: 67174404,
			25690112: 65536,
			26738688: 67174660,
			27787264: 65796,
			28835840: 67108868,
			29884416: 67109124,
			30932992: 67174400,
			31981568: 4,
			33030144: 65792
		}, {
			0: 2151682048,
			65536: 2147487808,
			131072: 4198464,
			196608: 2151677952,
			262144: 0,
			327680: 4198400,
			393216: 2147483712,
			458752: 4194368,
			524288: 2147483648,
			589824: 4194304,
			655360: 64,
			720896: 2147487744,
			786432: 2151678016,
			851968: 4160,
			917504: 4096,
			983040: 2151682112,
			32768: 2147487808,
			98304: 64,
			163840: 2151678016,
			229376: 2147487744,
			294912: 4198400,
			360448: 2151682112,
			425984: 0,
			491520: 2151677952,
			557056: 4096,
			622592: 2151682048,
			688128: 4194304,
			753664: 4160,
			819200: 2147483648,
			884736: 4194368,
			950272: 4198464,
			1015808: 2147483712,
			1048576: 4194368,
			1114112: 4198400,
			1179648: 2147483712,
			1245184: 0,
			1310720: 4160,
			1376256: 2151678016,
			1441792: 2151682048,
			1507328: 2147487808,
			1572864: 2151682112,
			1638400: 2147483648,
			1703936: 2151677952,
			1769472: 4198464,
			1835008: 2147487744,
			1900544: 4194304,
			1966080: 64,
			2031616: 4096,
			1081344: 2151677952,
			1146880: 2151682112,
			1212416: 0,
			1277952: 4198400,
			1343488: 4194368,
			1409024: 2147483648,
			1474560: 2147487808,
			1540096: 64,
			1605632: 2147483712,
			1671168: 4096,
			1736704: 2147487744,
			1802240: 2151678016,
			1867776: 4160,
			1933312: 2151682048,
			1998848: 4194304,
			2064384: 4198464
		}, {
			0: 128,
			4096: 17039360,
			8192: 262144,
			12288: 536870912,
			16384: 537133184,
			20480: 16777344,
			24576: 553648256,
			28672: 262272,
			32768: 16777216,
			36864: 537133056,
			40960: 536871040,
			45056: 553910400,
			49152: 553910272,
			53248: 0,
			57344: 17039488,
			61440: 553648128,
			2048: 17039488,
			6144: 553648256,
			10240: 128,
			14336: 17039360,
			18432: 262144,
			22528: 537133184,
			26624: 553910272,
			30720: 536870912,
			34816: 537133056,
			38912: 0,
			43008: 553910400,
			47104: 16777344,
			51200: 536871040,
			55296: 553648128,
			59392: 16777216,
			63488: 262272,
			65536: 262144,
			69632: 128,
			73728: 536870912,
			77824: 553648256,
			81920: 16777344,
			86016: 553910272,
			90112: 537133184,
			94208: 16777216,
			98304: 553910400,
			102400: 553648128,
			106496: 17039360,
			110592: 537133056,
			114688: 262272,
			118784: 536871040,
			122880: 0,
			126976: 17039488,
			67584: 553648256,
			71680: 16777216,
			75776: 17039360,
			79872: 537133184,
			83968: 536870912,
			88064: 17039488,
			92160: 128,
			96256: 553910272,
			100352: 262272,
			104448: 553910400,
			108544: 0,
			112640: 553648128,
			116736: 16777344,
			120832: 262144,
			124928: 537133056,
			129024: 536871040
		}, {
			0: 268435464,
			256: 8192,
			512: 270532608,
			768: 270540808,
			1024: 268443648,
			1280: 2097152,
			1536: 2097160,
			1792: 268435456,
			2048: 0,
			2304: 268443656,
			2560: 2105344,
			2816: 8,
			3072: 270532616,
			3328: 2105352,
			3584: 8200,
			3840: 270540800,
			128: 270532608,
			384: 270540808,
			640: 8,
			896: 2097152,
			1152: 2105352,
			1408: 268435464,
			1664: 268443648,
			1920: 8200,
			2176: 2097160,
			2432: 8192,
			2688: 268443656,
			2944: 270532616,
			3200: 0,
			3456: 270540800,
			3712: 2105344,
			3968: 268435456,
			4096: 268443648,
			4352: 270532616,
			4608: 270540808,
			4864: 8200,
			5120: 2097152,
			5376: 268435456,
			5632: 268435464,
			5888: 2105344,
			6144: 2105352,
			6400: 0,
			6656: 8,
			6912: 270532608,
			7168: 8192,
			7424: 268443656,
			7680: 270540800,
			7936: 2097160,
			4224: 8,
			4480: 2105344,
			4736: 2097152,
			4992: 268435464,
			5248: 268443648,
			5504: 8200,
			5760: 270540808,
			6016: 270532608,
			6272: 270540800,
			6528: 270532616,
			6784: 8192,
			7040: 2105352,
			7296: 2097160,
			7552: 0,
			7808: 268435456,
			8064: 268443656
		}, {
			0: 1048576,
			16: 33555457,
			32: 1024,
			48: 1049601,
			64: 34604033,
			80: 0,
			96: 1,
			112: 34603009,
			128: 33555456,
			144: 1048577,
			160: 33554433,
			176: 34604032,
			192: 34603008,
			208: 1025,
			224: 1049600,
			240: 33554432,
			8: 34603009,
			24: 0,
			40: 33555457,
			56: 34604032,
			72: 1048576,
			88: 33554433,
			104: 33554432,
			120: 1025,
			136: 1049601,
			152: 33555456,
			168: 34603008,
			184: 1048577,
			200: 1024,
			216: 34604033,
			232: 1,
			248: 1049600,
			256: 33554432,
			272: 1048576,
			288: 33555457,
			304: 34603009,
			320: 1048577,
			336: 33555456,
			352: 34604032,
			368: 1049601,
			384: 1025,
			400: 34604033,
			416: 1049600,
			432: 1,
			448: 0,
			464: 34603008,
			480: 33554433,
			496: 1024,
			264: 1049600,
			280: 33555457,
			296: 34603009,
			312: 1,
			328: 33554432,
			344: 1048576,
			360: 1025,
			376: 34604032,
			392: 33554433,
			408: 34603008,
			424: 0,
			440: 34604033,
			456: 1049601,
			472: 1024,
			488: 33555456,
			504: 1048577
		}, {
			0: 134219808,
			1: 131072,
			2: 134217728,
			3: 32,
			4: 131104,
			5: 134350880,
			6: 134350848,
			7: 2048,
			8: 134348800,
			9: 134219776,
			10: 133120,
			11: 134348832,
			12: 2080,
			13: 0,
			14: 134217760,
			15: 133152,
			2147483648: 2048,
			2147483649: 134350880,
			2147483650: 134219808,
			2147483651: 134217728,
			2147483652: 134348800,
			2147483653: 133120,
			2147483654: 133152,
			2147483655: 32,
			2147483656: 134217760,
			2147483657: 2080,
			2147483658: 131104,
			2147483659: 134350848,
			2147483660: 0,
			2147483661: 134348832,
			2147483662: 134219776,
			2147483663: 131072,
			16: 133152,
			17: 134350848,
			18: 32,
			19: 2048,
			20: 134219776,
			21: 134217760,
			22: 134348832,
			23: 131072,
			24: 0,
			25: 131104,
			26: 134348800,
			27: 134219808,
			28: 134350880,
			29: 133120,
			30: 2080,
			31: 134217728,
			2147483664: 131072,
			2147483665: 2048,
			2147483666: 134348832,
			2147483667: 133152,
			2147483668: 32,
			2147483669: 134348800,
			2147483670: 134217728,
			2147483671: 134219808,
			2147483672: 134350880,
			2147483673: 134217760,
			2147483674: 134219776,
			2147483675: 0,
			2147483676: 133120,
			2147483677: 2080,
			2147483678: 131104,
			2147483679: 134350848
		}], m = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679], n = i.DES = s.extend({
			_doReset: function () {
				for (var e = this._key.words, t = [], s = 0; s < 56; s++) {
					var r = d[s] - 1;
					t[s] = e[r >>> 5] >>> 31 - r % 32 & 1
				}
				for (var n = this._subKeys = [], i = 0; i < 16; i++) {
					for (var o = n[i] = [], a = u[i], s = 0; s < 24; s++) o[s / 6 | 0] |= t[(l[s] - 1 + a) % 28] << 31 - s % 6, o[4 + (s / 6 | 0)] |= t[28 + (l[s + 24] - 1 + a) % 28] << 31 - s % 6;
					o[0] = o[0] << 1 | o[0] >>> 31;
					for (s = 1; s < 7; s++) o[s] = o[s] >>> 4 * (s - 1) + 3;
					o[7] = o[7] << 5 | o[7] >>> 27
				}
				for (var c = this._invSubKeys = [], s = 0; s < 16; s++) c[s] = n[15 - s]
			},
			encryptBlock: function (e, t) {
				this._doCryptBlock(e, t, this._subKeys)
			},
			decryptBlock: function (e, t) {
				this._doCryptBlock(e, t, this._invSubKeys)
			},
			_doCryptBlock: function (e, t, s) {
				this._lBlock = e[t], this._rBlock = e[t + 1], p.call(this, 4, 252645135), p.call(this, 16, 65535), g.call(this, 2, 858993459), g.call(this, 8, 16711935), p.call(this, 1, 1431655765);
				for (var r = 0; r < 16; r++) {
					for (var n = s[r], i = this._lBlock, o = this._rBlock, a = 0, c = 0; c < 8; c++) a |= h[c][((o ^ n[c]) & m[c]) >>> 0];
					this._lBlock = o, this._rBlock = i ^ a
				}
				var d = this._lBlock;
				this._lBlock = this._rBlock, this._rBlock = d, p.call(this, 1, 1431655765), g.call(this, 8, 16711935), g.call(this, 2, 858993459), p.call(this, 16, 65535), p.call(this, 4, 252645135), e[t] = this._lBlock, e[t + 1] = this._rBlock
			},
			keySize: 2,
			ivSize: 2,
			blockSize: 2
		}), t.DES = s._createHelper(n), i = i.TripleDES = s.extend({
			_doReset: function () {
				var e = this._key.words;
				if (2 !== e.length && 4 !== e.length && e.length < 6) throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
				var t = e.slice(0, 2),
					s = e.length < 4 ? e.slice(0, 2) : e.slice(2, 4),
					e = e.length < 6 ? e.slice(0, 2) : e.slice(4, 6);
				this._des1 = n.createEncryptor(r.create(t)), this._des2 = n.createEncryptor(r.create(s)), this._des3 = n.createEncryptor(r.create(e))
			},
			encryptBlock: function (e, t) {
				this._des1.encryptBlock(e, t), this._des2.decryptBlock(e, t), this._des3.encryptBlock(e, t)
			},
			decryptBlock: function (e, t) {
				this._des3.decryptBlock(e, t), this._des2.encryptBlock(e, t), this._des1.decryptBlock(e, t)
			},
			keySize: 6,
			ivSize: 2,
			blockSize: 2
		}), t.TripleDES = s._createHelper(i), e.TripleDES)), as;

		function p(e, t) {
			t = (this._lBlock >>> e ^ this._rBlock) & t;
			this._rBlock ^= t, this._lBlock ^= t << e
		}

		function g(e, t) {
			t = (this._rBlock >>> e ^ this._lBlock) & t;
			this._lBlock ^= t, this._rBlock ^= t << e
		}
	}
	var ls, us = {},
		hs = {
			get exports() {
				return us
			},
			set exports(e) {
				us = e
			}
		};
	var ms, ps = {},
		gs = {
			get exports() {
				return ps
			},
			set exports(e) {
				ps = e
			}
		};
	var ys, fs, n, p, g, vs, v, w, A, ws, As, _s, bs, Ss, Ps, xs, Rs, ks, Is, Cs, Ts, Bs, t, Ds, Es, Os, Ns, js, Fs, Ms, qs, Ls, Us, Hs, zs, s, r, Ws, $s, _, Gs, Ks, Vs, b, Ys, Js, Xs = {},
		Qs = {
			get exports() {
				return Xs
			},
			set exports(e) {
				Xs = e
			}
		};

	function Zs() {
		for (var e = this._X, t = this._C, s = 0; s < 8; s++) p[s] = t[s];
		t[0] = t[0] + 1295307597 + this._b | 0, t[1] = t[1] + 3545052371 + (t[0] >>> 0 < p[0] >>> 0 ? 1 : 0) | 0, t[2] = t[2] + 886263092 + (t[1] >>> 0 < p[1] >>> 0 ? 1 : 0) | 0, t[3] = t[3] + 1295307597 + (t[2] >>> 0 < p[2] >>> 0 ? 1 : 0) | 0, t[4] = t[4] + 3545052371 + (t[3] >>> 0 < p[3] >>> 0 ? 1 : 0) | 0, t[5] = t[5] + 886263092 + (t[4] >>> 0 < p[4] >>> 0 ? 1 : 0) | 0, t[6] = t[6] + 1295307597 + (t[5] >>> 0 < p[5] >>> 0 ? 1 : 0) | 0, t[7] = t[7] + 3545052371 + (t[6] >>> 0 < p[6] >>> 0 ? 1 : 0) | 0, this._b = t[7] >>> 0 < p[7] >>> 0 ? 1 : 0;
		for (s = 0; s < 8; s++) {
			var r = e[s] + t[s],
				n = 65535 & r,
				i = r >>> 16;
			g[s] = ((n * n >>> 17) + n * i >>> 15) + i * i ^ ((4294901760 & r) * r | 0) + ((65535 & r) * r | 0)
		}
		e[0] = g[0] + (g[7] << 16 | g[7] >>> 16) + (g[6] << 16 | g[6] >>> 16) | 0, e[1] = g[1] + (g[0] << 8 | g[0] >>> 24) + g[7] | 0, e[2] = g[2] + (g[1] << 16 | g[1] >>> 16) + (g[0] << 16 | g[0] >>> 16) | 0, e[3] = g[3] + (g[2] << 8 | g[2] >>> 24) + g[1] | 0, e[4] = g[4] + (g[3] << 16 | g[3] >>> 16) + (g[2] << 16 | g[2] >>> 16) | 0, e[5] = g[5] + (g[4] << 8 | g[4] >>> 24) + g[3] | 0, e[6] = g[6] + (g[5] << 16 | g[5] >>> 16) + (g[4] << 16 | g[4] >>> 16) | 0, e[7] = g[7] + (g[6] << 8 | g[6] >>> 24) + g[5] | 0
	}

	function er() {
		for (var e = this._X, t = this._C, s = 0; s < 8; s++) w[s] = t[s];
		t[0] = t[0] + 1295307597 + this._b | 0, t[1] = t[1] + 3545052371 + (t[0] >>> 0 < w[0] >>> 0 ? 1 : 0) | 0, t[2] = t[2] + 886263092 + (t[1] >>> 0 < w[1] >>> 0 ? 1 : 0) | 0, t[3] = t[3] + 1295307597 + (t[2] >>> 0 < w[2] >>> 0 ? 1 : 0) | 0, t[4] = t[4] + 3545052371 + (t[3] >>> 0 < w[3] >>> 0 ? 1 : 0) | 0, t[5] = t[5] + 886263092 + (t[4] >>> 0 < w[4] >>> 0 ? 1 : 0) | 0, t[6] = t[6] + 1295307597 + (t[5] >>> 0 < w[5] >>> 0 ? 1 : 0) | 0, t[7] = t[7] + 3545052371 + (t[6] >>> 0 < w[6] >>> 0 ? 1 : 0) | 0, this._b = t[7] >>> 0 < w[7] >>> 0 ? 1 : 0;
		for (s = 0; s < 8; s++) {
			var r = e[s] + t[s],
				n = 65535 & r,
				i = r >>> 16;
			A[s] = ((n * n >>> 17) + n * i >>> 15) + i * i ^ ((4294901760 & r) * r | 0) + ((65535 & r) * r | 0)
		}
		e[0] = A[0] + (A[7] << 16 | A[7] >>> 16) + (A[6] << 16 | A[6] >>> 16) | 0, e[1] = A[1] + (A[0] << 8 | A[0] >>> 24) + A[7] | 0, e[2] = A[2] + (A[1] << 16 | A[1] >>> 16) + (A[0] << 16 | A[0] >>> 16) | 0, e[3] = A[3] + (A[2] << 8 | A[2] >>> 24) + A[1] | 0, e[4] = A[4] + (A[3] << 16 | A[3] >>> 16) + (A[2] << 16 | A[2] >>> 16) | 0, e[5] = A[5] + (A[4] << 8 | A[4] >>> 24) + A[3] | 0, e[6] = A[6] + (A[5] << 16 | A[5] >>> 16) + (A[4] << 16 | A[4] >>> 16) | 0, e[7] = A[7] + (A[6] << 8 | A[6] >>> 24) + A[5] | 0
	}

	function tr() {
		for (var e = this._S, t = this._i, s = this._j, r = 0, n = 0; n < 4; n++) {
			var s = (s + e[t = (t + 1) % 256]) % 256,
				i = e[t];
			e[t] = e[s], e[s] = i, r |= e[(e[t] + e[s]) % 256] << 24 - 8 * n
		}
		return this._i = t, this._j = s, r
	}

	function sr(e, t, s) {
		return e & t | ~e & s
	}

	function rr(e, t, s) {
		return e & s | t & ~s
	}

	function nr(e, t) {
		return e << t | e >>> 32 - t
	}

	function ir(e, t, s) {
		for (var r, n, i = [], o = 0, a = 0; a < t; a++) a % 4 && (r = s[e.charCodeAt(a - 1)] << a % 4 * 2, n = s[e.charCodeAt(a)] >>> 6 - a % 4 * 2, i[o >>> 2] |= (r | n) << 24 - o % 4 * 8, o++);
		return Js.create(i, o)
	}
	e.exports = (e = y(), Ae(), Pe(), Ie(), De(), fs || (fs = 1, Oe.exports = (Ys = y(), Js = Ys.lib.WordArray, Ys.enc.Base64url = {
		stringify: function (e, t = !0) {
			for (var s = e.words, r = e.sigBytes, n = t ? this._safe_map : this._map, i = (e.clamp(), []), o = 0; o < r; o += 3)
				for (var a = (s[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (s[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | s[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, c = 0; c < 4 && o + .75 * c < r; c++) i.push(n.charAt(a >>> 6 * (3 - c) & 63));
			var d = n.charAt(64);
			if (d)
				for (; i.length % 4;) i.push(d);
			return i.join("")
		},
		parse: function (e, t = !0) {
			var s = e.length,
				r = t ? this._safe_map : this._map;
			if (!(n = this._reverseMap))
				for (var n = this._reverseMap = [], i = 0; i < r.length; i++) n[r.charCodeAt(i)] = i;
			var t = r.charAt(64);
			return t && -1 !== (t = e.indexOf(t)) && (s = t), ir(e, s, n)
		},
		_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		_safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
	}, Ys.enc.Base64url)), Me(), He(), Ge(), vs || (vs = 1, Ve.exports = (Ys = y(), Ge(), Ks = (Gs = Ys).lib.WordArray, b = Gs.algo, Vs = b.SHA256, b = b.SHA224 = Vs.extend({
		_doReset: function () {
			this._hash = new Ks.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
		},
		_doFinalize: function () {
			var e = Vs._doFinalize.call(this);
			return e.sigBytes -= 4, e
		}
	}), Gs.SHA224 = Vs._createHelper(b), Gs.HmacSHA224 = Vs._createHmacHelper(b), Ys.SHA224)), Qe(), or || (or = 1, et.exports = (Gs = y(), Ae(), Qe(), _ = (b = Gs).x64, r = _.Word, Ws = _.WordArray, _ = b.algo, $s = _.SHA512, _ = _.SHA384 = $s.extend({
		_doReset: function () {
			this._hash = new Ws.init([new r.init(3418070365, 3238371032), new r.init(1654270250, 914150663), new r.init(2438529370, 812702999), new r.init(355462360, 4144912697), new r.init(1731405415, 4290775857), new r.init(2394180231, 1750603025), new r.init(3675008525, 1694076839), new r.init(1203062813, 3204075428)])
		},
		_doFinalize: function () {
			var e = $s._doFinalize.call(this);
			return e.sigBytes -= 16, e
		}
	}), b.SHA384 = $s._createHelper(_), b.HmacSHA384 = $s._createHmacHelper(_), Gs.SHA384)), nt(), T || (T = 1, ot.exports = (_ = y(), s = (Ns = _).lib, js = s.WordArray, Fs = s.Hasher, s = Ns.algo, Ms = js.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]), qs = js.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]), Ls = js.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]), Us = js.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]), Hs = js.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), zs = js.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), s = s.RIPEMD160 = Fs.extend({
		_doReset: function () {
			this._hash = js.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
		},
		_doProcessBlock: function (e, t) {
			for (var s = 0; s < 16; s++) {
				var r = t + s,
					n = e[r];
				e[r] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8)
			}
			for (var i, o, a, c, d, l, u = this._hash.words, h = Hs.words, m = zs.words, p = Ms.words, g = qs.words, y = Ls.words, f = Us.words, v = i = u[0], w = o = u[1], A = a = u[2], _ = c = u[3], b = d = u[4], s = 0; s < 80; s += 1) l = (l = nr(l = (l = i + e[t + p[s]] | 0) + (s < 16 ? (o ^ a ^ c) + h[0] : s < 32 ? sr(o, a, c) + h[1] : s < 48 ? ((o | ~a) ^ c) + h[2] : s < 64 ? rr(o, a, c) + h[3] : (o ^ (a | ~c)) + h[4]) | 0, y[s])) + d | 0, i = d, d = c, c = nr(a, 10), a = o, o = l, l = (l = nr(l = (l = v + e[t + g[s]] | 0) + (s < 16 ? (w ^ (A | ~_)) + m[0] : s < 32 ? rr(w, A, _) + m[1] : s < 48 ? ((w | ~A) ^ _) + m[2] : s < 64 ? sr(w, A, _) + m[3] : (w ^ A ^ _) + m[4]) | 0, f[s])) + b | 0, v = b, b = _, _ = nr(A, 10), A = w, w = l;
			l = u[1] + a + _ | 0, u[1] = u[2] + c + b | 0, u[2] = u[3] + d + v | 0, u[3] = u[4] + i + w | 0, u[4] = u[0] + o + A | 0, u[0] = l
		},
		_doFinalize: function () {
			for (var e = this._data, t = e.words, s = 8 * this._nDataBytes, r = 8 * e.sigBytes, r = (t[r >>> 5] |= 128 << 24 - r % 32, t[14 + (64 + r >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), e.sigBytes = 4 * (t.length + 1), this._process(), this._hash), n = r.words, i = 0; i < 5; i++) {
				var o = n[i];
				n[i] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
			}
			return r
		},
		clone: function () {
			var e = Fs.clone.call(this);
			return e._hash = this._hash.clone(), e
		}
	}), Ns.RIPEMD160 = Fs._createHelper(s), Ns.HmacRIPEMD160 = Fs._createHmacHelper(s), _.RIPEMD160)), lt(), Ln || (Ln = 1, ht.exports = (Ns = y(), He(), lt(), t = (s = Ns).lib, Ts = t.Base, Bs = t.WordArray, t = s.algo, Ds = t.SHA1, Es = t.HMAC, Os = t.PBKDF2 = Ts.extend({
		cfg: Ts.extend({
			keySize: 4,
			hasher: Ds,
			iterations: 1
		}),
		init: function (e) {
			this.cfg = this.cfg.extend(e)
		},
		compute: function (e, t) {
			for (var s = this.cfg, r = Es.create(s.hasher, e), n = Bs.create(), i = Bs.create([1]), o = n.words, a = i.words, c = s.keySize, d = s.iterations; o.length < c;) {
				for (var l = r.update(t).finalize(i), u = (r.reset(), l.words), h = u.length, m = l, p = 1; p < d; p++) {
					m = r.finalize(m), r.reset();
					for (var g = m.words, y = 0; y < h; y++) u[y] ^= g[y]
				}
				n.concat(l), a[0]++
			}
			return n.sigBytes = 4 * c, n
		}
	}), s.PBKDF2 = function (e, t, s) {
		return Os.create(s).compute(e, t)
	}, Ns.PBKDF2)), yt(), f(), St(), kt(), Bt(), Nt(), si || (si = 1, Ft.exports = (Cs = y(), f(), Cs.mode.ECB = function () {
		var e = Cs.lib.BlockCipherMode.extend();
		return e.Encryptor = e.extend({
			processBlock: function (e, t) {
				this._cipher.encryptBlock(e, t)
			}
		}), e.Decryptor = e.extend({
			processBlock: function (e, t) {
				this._cipher.decryptBlock(e, t)
			}
		}), e
	}(), Cs.mode.ECB)), Mt || (Mt = 1, Lt.exports = (t = y(), f(), t.pad.AnsiX923 = {
		pad: function (e, t) {
			var s = e.sigBytes,
				t = 4 * t,
				t = t - s % t,
				s = s + t - 1;
			e.clamp(), e.words[s >>> 2] |= t << 24 - s % 4 * 8, e.sigBytes += t
		},
		unpad: function (e) {
			var t = 255 & e.words[e.sigBytes - 1 >>> 2];
			e.sigBytes -= t
		}
	}, t.pad.Ansix923)), Ut || (Ut = 1, zt.exports = (Is = y(), f(), Is.pad.Iso10126 = {
		pad: function (e, t) {
			t *= 4, t -= e.sigBytes % t;
			e.concat(Is.lib.WordArray.random(t - 1)).concat(Is.lib.WordArray.create([t << 24], 1))
		},
		unpad: function (e) {
			var t = 255 & e.words[e.sigBytes - 1 >>> 2];
			e.sigBytes -= t
		}
	}, Is.pad.Iso10126)), Wt || (Wt = 1, Gt.exports = (ks = y(), f(), ks.pad.Iso97971 = {
		pad: function (e, t) {
			e.concat(ks.lib.WordArray.create([2147483648], 1)), ks.pad.ZeroPadding.pad(e, t)
		},
		unpad: function (e) {
			ks.pad.ZeroPadding.unpad(e), e.sigBytes--
		}
	}, ks.pad.Iso97971)), Kt || (Kt = 1, Yt.exports = (Ts = y(), f(), Ts.pad.ZeroPadding = {
		pad: function (e, t) {
			t *= 4;
			e.clamp(), e.sigBytes += t - (e.sigBytes % t || t)
		},
		unpad: function (e) {
			for (var t = e.words, s = e.sigBytes - 1, s = e.sigBytes - 1; 0 <= s; s--)
				if (t[s >>> 2] >>> 24 - s % 4 * 8 & 255) {
					e.sigBytes = s + 1;
					break
				}
		}
	}, Ts.pad.ZeroPadding)), Jt || (Jt = 1, Qt.exports = (Ds = y(), f(), Ds.pad.NoPadding = {
		pad: function () { },
		unpad: function () { }
	}, Ds.pad.NoPadding)), Zt || (Zt = 1, ts.exports = (Ps = y(), f(), xs = Ps.lib.CipherParams, Rs = Ps.enc.Hex, Ps.format.Hex = {
		stringify: function (e) {
			return e.ciphertext.toString(Rs)
		},
		parse: function (e) {
			e = Rs.parse(e);
			return xs.create({
				ciphertext: e
			})
		}
	}, Ps.format.Hex)), is(), ds(), ls || (ls = 1, hs.exports = (Ps = y(), De(), Me(), yt(), f(), _s = (As = Ps).lib.StreamCipher, Ss = As.algo, bs = Ss.RC4 = _s.extend({
		_doReset: function () {
			for (var e = this._key, t = e.words, s = e.sigBytes, r = this._S = [], n = 0; n < 256; n++) r[n] = n;
			for (var n = 0, i = 0; n < 256; n++) {
				var o = n % s,
					o = t[o >>> 2] >>> 24 - o % 4 * 8 & 255,
					i = (i + r[n] + o) % 256,
					o = r[n];
				r[n] = r[i], r[i] = o
			}
			this._i = this._j = 0
		},
		_doProcessBlock: function (e, t) {
			e[t] ^= tr.call(this)
		},
		keySize: 8,
		ivSize: 0
	}), As.RC4 = _s._createHelper(bs), Ss = Ss.RC4Drop = bs.extend({
		cfg: bs.cfg.extend({
			drop: 192
		}),
		_doReset: function () {
			bs._doReset.call(this);
			for (var e = this.cfg.drop; 0 < e; e--) tr.call(this)
		}
	}), As.RC4Drop = _s._createHelper(Ss), Ps.RC4)), ms || (ms = 1, gs.exports = (As = y(), De(), Me(), yt(), f(), Ss = (_s = As).lib.StreamCipher, ws = _s.algo, v = [], w = [], A = [], ws = ws.Rabbit = Ss.extend({
		_doReset: function () {
			for (var e = this._key.words, t = this.cfg.iv, s = 0; s < 4; s++) e[s] = 16711935 & (e[s] << 8 | e[s] >>> 24) | 4278255360 & (e[s] << 24 | e[s] >>> 8);
			for (var r = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16], n = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]], s = this._b = 0; s < 4; s++) er.call(this);
			for (s = 0; s < 8; s++) n[s] ^= r[s + 4 & 7];
			if (t) {
				var t = t.words,
					i = t[0],
					t = t[1],
					i = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8),
					t = 16711935 & (t << 8 | t >>> 24) | 4278255360 & (t << 24 | t >>> 8),
					o = i >>> 16 | 4294901760 & t,
					a = t << 16 | 65535 & i;
				n[0] ^= i, n[1] ^= o, n[2] ^= t, n[3] ^= a, n[4] ^= i, n[5] ^= o, n[6] ^= t, n[7] ^= a;
				for (s = 0; s < 4; s++) er.call(this)
			}
		},
		_doProcessBlock: function (e, t) {
			var s = this._X;
			er.call(this), v[0] = s[0] ^ s[5] >>> 16 ^ s[3] << 16, v[1] = s[2] ^ s[7] >>> 16 ^ s[5] << 16, v[2] = s[4] ^ s[1] >>> 16 ^ s[7] << 16, v[3] = s[6] ^ s[3] >>> 16 ^ s[1] << 16;
			for (var r = 0; r < 4; r++) v[r] = 16711935 & (v[r] << 8 | v[r] >>> 24) | 4278255360 & (v[r] << 24 | v[r] >>> 8), e[t + r] ^= v[r]
		},
		blockSize: 4,
		ivSize: 2
	}), _s.Rabbit = Ss._createHelper(ws), As.Rabbit)), ys || (ys = 1, Qs.exports = (ws = y(), De(), Me(), yt(), f(), Oe = (fs = ws).lib.StreamCipher, vs = fs.algo, n = [], p = [], g = [], vs = vs.RabbitLegacy = Oe.extend({
		_doReset: function () {
			for (var e = this._key.words, t = this.cfg.iv, s = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16], r = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]], n = this._b = 0; n < 4; n++) Zs.call(this);
			for (n = 0; n < 8; n++) r[n] ^= s[n + 4 & 7];
			if (t) {
				var e = t.words,
					t = e[0],
					e = e[1],
					t = 16711935 & (t << 8 | t >>> 24) | 4278255360 & (t << 24 | t >>> 8),
					e = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8),
					i = t >>> 16 | 4294901760 & e,
					o = e << 16 | 65535 & t;
				r[0] ^= t, r[1] ^= i, r[2] ^= e, r[3] ^= o, r[4] ^= t, r[5] ^= i, r[6] ^= e, r[7] ^= o;
				for (n = 0; n < 4; n++) Zs.call(this)
			}
		},
		_doProcessBlock: function (e, t) {
			var s = this._X;
			Zs.call(this), n[0] = s[0] ^ s[5] >>> 16 ^ s[3] << 16, n[1] = s[2] ^ s[7] >>> 16 ^ s[5] << 16, n[2] = s[4] ^ s[1] >>> 16 ^ s[7] << 16, n[3] = s[6] ^ s[3] >>> 16 ^ s[1] << 16;
			for (var r = 0; r < 4; r++) n[r] = 16711935 & (n[r] << 8 | n[r] >>> 24) | 4278255360 & (n[r] << 24 | n[r] >>> 8), e[t + r] ^= n[r]
		},
		blockSize: 4,
		ivSize: 2
	}), fs.RabbitLegacy = Oe._createHelper(vs), ws.RabbitLegacy)), e);
	var S, P, or, ar = me;
	const cr = class ni {
		constructor() {
			this.handleUrl = e => t => {
				if (t) {
					const s = [];
					Object.keys(t).forEach(e => s.push("keys=" + t[e])), -1 === e.search(/\?/) ? "object" == typeof t && (e += "?" + s.join("&")) : e += "&" + s.join("&")
				}
				return e
			}
		}
		static get instance() {
			return this._instance || (this._instance = new ni), this._instance
		}
		getDataAsync(a) {
			return u(this, void 0, void 0, function* () {
				console.info("====> getData userId: ", ae.getUserId()), "" === ae.getUserId() && console.error("=====> userId is null");
				var e = M.get,
					t = `${d.channelName}_${d.channel}_${d.gameId}_` + ae.getUserId(),
					s = (console.info("get data id: ", t), (new Date).toUTCString().toString()),
					r = ar.enc.Base64,
					n = ar.HmacSHA512;
				let i = `/${m.GET_DATA}/${t}?`,
					o = `${m.PAY_IP}/dev/${m.GET_DATA}/${t}?`;
				return a.forEach((e, t) => {
					0 !== t && (o += "&", i += "&"), o += "keys=" + e, i += "keys=" + e
				}), t = r.stringify(n(`(request-target): get ${i}
x-date: ${s}
digest: `, "HMACSHA512-SecretKey")), (r = new Headers).append("Authorization", `Signature keyId="write",algorithm="hmac-sha512",headers="(request-target) x-date digest",signature="${t}"`), r.append("x-date", s), n = {
						method: e,
						headers: r,
						redirect: "follow"
					}, yield fetch(o, n).then(e => e.ok ? e.json() : Promise.reject({
						code: e.status,
						message: `get ${o} fail status: ` + e.status
					})).then(e => (console.info(`get ${o} success response: ` + JSON.stringify(e)), Promise.resolve(e.data))).catch(e => (console.error(`get ${o} error: ` + e.message), Promise.reject({
						code: "CloudStorage getData error",
						message: e.message
					})))
			})
		}
		setDataAsync(a) {
			return u(this, void 0, void 0, function* () {
				"" === ae.getUserId() && console.error("=====> userId is null");
				var e = M.post,
					t = (new Date).toUTCString().toString(),
					s = ar.SHA256,
					r = ar.enc.Base64,
					n = ar.HmacSHA512,
					i = `${d.channelName}_${d.channel}_${d.gameId}_` + ae.getUserId(),
					i = (console.info("set data id: ", i), {
						id: i,
						data: a
					}),
					s = "SHA-256=" + r.stringify(s(JSON.stringify(i))),
					r = r.stringify(n(`(request-target): post /${m.SET_DATA}
x-date: ${t}
digest: ` + s, "HMACSHA512-SecretKey")),
					r = ((n = new Headers).append("Authorization", `Signature keyId="write",algorithm="hmac-sha512",headers="(request-target) x-date digest",signature="${r}"`), n.append("Content-Type", "application/json"), n.append("x-date", t), n.append("digest", s), {
						method: e,
						headers: n,
						body: JSON.stringify(i)
					});
				const o = m.PAY_IP + "/dev/" + m.SET_DATA;
				return console.info("=====> cloudStorage setData: ", JSON.stringify(i)), yield fetch(o, r).then(e => e.ok ? e.json() : Promise.reject({
					code: e.status,
					message: `post ${o} fail status: ` + e.status
				})).then(e => (console.info(`post ${o} success response: ` + JSON.stringify(e)), Promise.resolve())).catch(e => (console.error("CloudStorage setData error: " + e.message), Promise.reject({
					message: "CloudStorage setData error: " + e.message
				})))
			})
		}
	}.instance;
	const dr = class ii {
		static get instance() {
			return this._instance || (this._instance = new ii), this._instance
		}
		init() { }
		getDataAsync(e) {
			if (!e || 0 === e.length) return Promise.reject({
				message: "LocalStorage getData keys null"
			});
			var t = {};
			for (const s of e) t[s] = a(s);
			return console.info("======> get local data: ", t), Promise.resolve(t)
		}
		setDataAsync(e) {
			if (!e) return Promise.reject({
				message: "LocalStorage setData data null"
			});
			for (const t in e) $(t, e[t]);
			return c(), console.info("======> set local data: ", e), Promise.resolve()
		}
	}.instance;
	(Ve = S = S || {}).Local = "Local", Ve.Cloud = "Cloud", Ve.None = "None", (or = P = P || {}).GuestUid = "guestUid", or.UserPhone = "userPhone", or.StorageType = "storageType";
	const x = class oi {
		constructor() {
			this._storageType = S.None, this._guestUid = "", this._userPhone = ""
		}
		static get instance() {
			return this._instance || (this._instance = new oi), this._instance
		}
		init() {
			dr.init()
		}
		set storageType(e) {
			this._storageType = e, $(P.StorageType, this._storageType), c()
		}
		get storageType() {
			return a(P.StorageType) && (this._storageType = a(P.StorageType)), this._storageType
		}
		set guestUid(e) {
			this._guestUid = e, $(P.GuestUid, this._guestUid), c()
		}
		get guestUid() {
			return a(P.GuestUid) && (this._guestUid = a(P.GuestUid)), this._guestUid
		}
		set userPhone(e) {
			this._userPhone = e, $(P.UserPhone, this._userPhone), c()
		}
		get userPhone() {
			return a(P.UserPhone) && (this._userPhone = a(P.UserPhone)), this._userPhone
		}
		isNewUser() {
			return u(this, void 0, void 0, function* () {
				try {
					var e = z,
						t = Object.keys(e),
						s = yield cr.getDataAsync(t), r = !s;
					return console.info(`====> check keys: ${t}/
 getData: ${s}
 !!getData: ` + r), Promise.resolve(r)
				} catch (e) {
					return console.error("isNewUser error: " + e.message), Promise.reject({
						code: "isNewUser error",
						message: e.message
					})
				}
			})
		}
		checkNewUser() {
			return u(this, void 0, void 0, function* () {
				try {
					var e = yield this.isNewUser();
					return e ? yield this.dealBindingAccountSuccess() : this.dealExistAccountBinding(), Promise.resolve(e)
				} catch (e) {
					return console.error("checkNewUser error: " + e.message), Promise.reject({
						code: "checkNewUser error",
						message: "" + e.message
					})
				}
			})
		}
		dealExistAccountBinding() {
			var e = {
				btnName: "SWITCH"
			};
			e.message = `Sorry,This account already exists,
please change a new account.

If you want switch account,
please click the button.`, e.btnFunc = () => {
					ce.show()
				}, ue.init(e), ue.show()
		}
		dealBindingAccountSuccess() {
			return u(this, void 0, void 0, function* () {
				try {
					return yield cr.setDataAsync(z), le.success({
						message: "Register success.",
						autoCloseTime: 2,
						top: "50%",
						left: "50%"
					}), Promise.resolve()
				} catch (e) {
					return le.success({
						message: "Register fail.",
						autoCloseTime: 2,
						top: "50%",
						left: "50%"
					}), Promise.reject({
						code: "fail save local data to cloud",
						message: e.message
					})
				}
			})
		}
		getDataAsync(e) {
			return (this._storageType === S.Cloud ? cr : dr).getDataAsync(e)
		}
		setDataAsync(e) {
			return (this._storageType === S.Cloud ? cr : dr).setDataAsync(e)
		}
	}.instance;
	class lr {
		getASID() {
			return ""
		}
		getSignature() {
			return ""
		}
	}
	class ur {
		constructor(e, t = "") {
			this._id = e, this._name = t
		}
		static get currentPlayer() {
			if (!this._currentPlayer) {
				var [t = ""] = [];
				if (!W) {
					W = !0, null !== t && (H += t);
					t = localStorage.getItem(H);
					if (null != t) try {
						var s = JSON.parse(t);
						z = s
					} catch (e) {
						console.error("Failed to parse local data: " + t)
					}
				}
				let e = a(this.PLAYER_KEY, "");
				"" === e && (e = o.generateId(), $(this.PLAYER_KEY, e), c()), ur._currentPlayer = new ur(e)
			}
			return this._currentPlayer
		}
		getID() {
			return this._id
		}
		getSignedPlayerInfoAsync(e) {
			return o.emptyWaitUnsupportApi("FBPlayer.getSignedPlayerInfoAsync")
		}
		canSubscribeBotAsync() {
			return o.emptyWaitBool(!1)
		}
		subscribeBotAsync() {
			return o.emptyWaitUnsupportApi("FBPlayer.subscribeBotAsync")
		}
		getName() {
			return this._name
		}
		getPhoto() {
			return ""
		}
		getDataAsync(e) {
			if (window.MiniGameAds && window.MiniGameAds.isTest) {
				var t = {};
				for (const s of e) t[s] = a(s);
				return o.emptyWaitObject(t)
			}
			return console.info("=======> get data with keys: ", e), x.getDataAsync(e)
		}
		setDataAsync(e) {
			if (console.info("=======> set data: ", e), window.MiniGameAds && window.MiniGameAds.isTest) {
				for (const t in e) $(t, e[t]);
				return c(), o.emptyWaitObject(null)
			}
			return x.setDataAsync(e)
		}
		flushDataAsync() {
			return c(), o.emptyWaitObject(null)
		}
		getStatsAsync(e) {
			return this.getDataAsync(e)
		}
		setStatsAsync(e) {
			return this.setDataAsync(e)
		}
		incrementStatsAsync(e) {
			let t = !1;
			var s = {};
			for (const i in e) {
				if ("number" != typeof e[i]) {
					t = !0;
					break
				}
				var r = a(i, 0) + 1;
				$(i, r), s[i] = r
			}
			var n = t ? {
				code: -1,
				msg: "error! one or more data type not number!"
			} : s;
			return t || c(), o.emptyWaitObject(n)
		}
		getConnectedPlayersAsync() {
			return o.emptyWaitObject([])
		}
		getASIDAsync() {
			return o.emptyWaitObject(this.getID())
		}
		getSignedASIDAsync() {
			var e = new lr;
			return o.emptyWaitObject(e)
		}
	}

	function hr(r, n, i) {
		void 0 === n && (n = 0), void 0 === i && (i = 50);
		let o, a;
		return new Promise(function (e, t) {
			const s = function () {
				r() ? (a && clearTimeout(a), e()) : o = setTimeout(s, i)
			};
			o = setTimeout(s, i), 0 < n && (a = setTimeout(() => {
				o && clearTimeout(o), t(j.TIMEOUT)
			}, n))
		})
	}

	function mr(e, t, s) {
		return e && Object.prototype.hasOwnProperty.call(e, t) ? e[t] : s
	}
	ur.PLAYER_KEY = "_minigame_player_id_";
	const pr = {
		preroll: "preroll",
		start: "start",
		pause: "pause",
		next: "next",
		browse: "browse",
		reward: "reward"
	},
		gr = {
			notReady: "notReady",
			timeout: "timeout",
			error: "error",
			noAdPreloaded: "noAdPreloaded",
			frequencyCapped: "frequencyCapped",
			ignored: "ignored",
			other: "other",
			dismissed: "dismissed",
			viewed: "viewed"
		};
	let yr = !1,
		fr = 0;
	const vr = 5;
	let wr;

	function Ar() {
		return !!mr(wr, "ignorePreload", !1) || yr
	}

	function _r() {
		return fr <= 0 ? 0 : fr + vr - Date.now()
	}

	function br(e) {
		return e === gr.viewed || e === gr.dismissed
	}

	function Sr(e) {
		let t = "UNKNOWN_ERROR",
			s = t;
		return e && (e.breakStatus && (t = e.breakStatus), s = `${e.breakFormat}:${e.breakType}:${e.breakName} error, status: ` + e.breakStatus), Pr(t, s)
	}

	function Pr(e, t) {
		return {
			code: e,
			message: t
		}
	}

	function xr(e) {
		return e === pr.preroll
	}

	function Rr(e) {
		return e === pr.reward
	}
	let kr = !1;

	function Ir() {
		if (!kr) {
			kr = !0, console.info("===> checking Ads");
			try {
				adConfig({
					onReady: () => {
						console.info("===> Ads are ready"), yr = !0, kr = !1
					}
				})
			} catch (e) {
				console.debug("===> Check Ready, got error: ", e), console.info("===> Assume Ads ready"), yr = !0, kr = !1
			}
		}
	}

	function Cr(r, n, i) {
		return null != i && i.onShow(), console.info("===> showAdSenseAsync called: ", r, n), Rr(r) && mr(wr, "interstitial_for_rewarded", !1) && (r = pr.next, console.debug("===> showAdSenseAsync, replace rewarded with interstitial [next]")), new Promise((t, s) => {
			if (!xr(r)) {
				if (!Ar()) return void s(Pr("notLoaded", "ad not loaded"));
				if (!(_r() <= 0)) return void s(Pr("notReady", "ad not ready, wait: " + (_r() / 1e3).toFixed(2) + " seconds"))
			}
			var e = {
				type: r,
				name: n,
				adBreakDone: e => {
					console.info("===> showAdSense:adBreakDone, type: " + r + ", name: " + n, e), br(e.breakStatus) ? (fr = Date.now(), null != i && i.onClose(), yr = !1, setTimeout(() => {
						Ir()
					}, 100)) : null != i && i.onFail(), Rr(r) ? e.breakStatus === gr.viewed ? t() : s(Sr(e)) : br(e.breakStatus) ? (null != i && i.onSuccess(), t()) : (s(Sr(e)), null != i && i.onFail())
				}
			};
			xr(r) || (e.beforeAd = () => {
				console.info("===> showAdSense:beforeAd, type: " + r + ", name: " + n)
			}, e.afterAd = () => {
				console.info("===> showAdSense:afterAd, type: " + r + ", name: " + n)
			}), Rr(r) && (e.beforeReward = e => {
				console.info("===> showAdSense:beforeReward, type: " + r + ", name: " + n), e(), null != i && i.onSuccess()
			}, e.adDismissed = () => {
				console.info("===> showAdSense:adDismissed, type: " + r + ", name: " + n), null != i && i.onFail()
			}, e.adViewed = () => {
				console.info("===> showAdSense:adViewed, type: " + r + ", name: " + n)
			}), console.info("===> showAdSense:tryShow, type: " + r + ", name: " + n), adBreak(e)
		})
	}
	let Tr = !1;

	function Br() {
		const e = "reward",
			t = "reward";
		var s = {
			type: e,
			name: t,
			beforeAd: () => {
				console.info("===> showAdSense:beforeAd, type: reward, name: " + t)
			},
			afterAd: () => {
				console.info("===> showAdSense:afterAd, type: reward, name: " + t)
			},
			beforeReward: e => {
				console.info("===> showAdSense:beforeReward, type: reward, name: " + t)
			},
			adDismissed: () => {
				console.info("===> showAdSense:adDismissed, type: reward, name: " + t)
			},
			adViewed: () => {
				console.info("===> showAdSense:adViewed, type: reward, name: " + t)
			},
			adBreakDone: e => {
				console.info("===> showAdSense:adBreakDone, type: reward, name: " + t, e), Tr || "notReady" === e.breakStatus && (Tr = !0, h.waitTime(1e3, Br))
			}
		};
		adBreak(s)
	} (class ai {
		constructor() {
			this._adsDataFile = ""
		}
		static createDefaultInstance() {
			return this._instance || (this._instance = new ai), this._instance
		}
		static get instance() {
			return this._instance || (this._instance = new ai), this._instance
		}
		get strategy() {
			return this._adsStrategyOption
		}
		get adsShowOption() {
			return this._adsShowOption
		}
		fetchConfigAsync(r) {
			return u(this, void 0, void 0, function* () {
				try {
					var e = r,
						t = yield fetch(e);
					if (404 === t.status) throw {
						code: "No_Config_File",
						message: "there is no config file " + e
					};
					var s = yield t.json();
					return this._adsStrategyOption = s.ad_configs, console.info("fetchAdsStrategyConfig success: ", this._adsStrategyOption), Promise.resolve()
				} catch (e) {
					return Promise.reject({
						message: "fetchAdsConfig error: " + e.message
					})
				}
			})
		}
		fetchAdsData(s) {
			return u(this, void 0, void 0, function* () {
				try {
					var e = !!(s && 0 < s.length),
						t = (e || console.warn("fetchAdsData error: url is null"), this._adsDataFile = e ? s : "https://api.150ad.com/test/data.json", yield fetch(this._adsDataFile));
					return this._adsShowOption = yield t.json(), console.info("fetchAdsData success: ", this._adsShowOption), Promise.resolve()
				} catch (e) {
					return Promise.reject({
						code: "No_Ads_Data",
						message: "load ads data file: " + e.message
					})
				}
			})
		}
		fetchShowConfigAsync(e) {
			return u(this, void 0, void 0, function* () {
				try {
					if (!this._adsShowOption) {
						let e = this._adsDataFile || "https://api.150ad.com/test/data.json";
						window.MiniGameAds && window.MiniGameAds.isTest && (e = "https://api.150ad.com/test/data.json");
						var t = yield fetch(e);
						this._adsShowOption = yield t.json(), console.info("fetchAdsShowConfig success: ", this._adsShowOption)
					}
					return Promise.resolve(this._adsShowOption)
				} catch (e) {
					throw console.error("fetchShowConfig error: ", e), {
						code: "Fetch_Ads_Data_Error",
						message: "data file was " + e.message
					}
				}
			})
		}
		isPlatformOpen(t) {
			var e = this.strategy.platforms.find(e => e.id === t);
			return !!e && e.enabled
		}
	}).instance;
	class R {
		constructor(e, t, s) {
			this.type = e, this.isOneWay = t, this._serviceHandler = s
		}
		onRequest(e) {
			return u(this, void 0, void 0, function* () {
				return this._serviceHandler ? this._serviceHandler(e) : Promise.resolve(k(e))
			})
		}
	}

	function Dr(e) {
		return e + "_RESPONSE"
	}

	function Er(e, t, s, r) {
		return {
			type: Dr(e.type),
			requestType: e.type,
			requestId: e.requestId,
			code: t,
			message: s,
			payload: r
		}
	}

	function k(e, t) {
		return Er(e, j.OK.code, j.OK.message, t)
	}

	function I(e, t, s, r) {
		return Er(e, t, s, r)
	}
	class Or {
		constructor(e) {
			this._window = e, this._messageDispatcher = this._onReceiveMessage.bind(this)
		}
		_onReceiveMessage(e) {
			try {
				var t = e.data;
				t && t.type && this.dispatch(t, e.source)
			} catch (e) {
				console.error("Error in receiveMessage: ", e)
			}
		}
		static postMessageTo(e, t, s = "*") {
			e.postMessage(t, s)
		}
		start() {
			this._window.addEventListener("message", this._messageDispatcher, !1)
		}
		stop() {
			this._window.removeEventListener("message", this._messageDispatcher, !1)
		}
	}
	const Nr = new class {
		getCatalogAsync() {
			return o.emptyWaitObject([])
		}
		purchaseAsync(e) {
			return o.emptyWaitObject(null)
		}
		getPurchasesAsync() {
			return o.emptyWaitObject([])
		}
		consumePurchaseAsync(e) {
			return o.emptyWaitObject(null)
		}
		onReady(e) {
			e()
		}
	};
	class jr {
		constructor() {
			this._payType = "", this.getAvailableGoodsResult = null, this.queryUnConsumeOrderResult = null, this.payResult = null, this.consumeOrderResult = null
		}
		getCatalogAsync() {
			return new Promise((n, i) => {
				var e = window.AdInteractive;
				e || i("Android AdInteractive is not exist"), e.getAvailableGoods(), this.getAvailableGoodsResult = (e, t, s) => {
					if (e) {
						console.info("====> getAvailableGoodsResult productInfos: ", t);
						e = JSON.parse(t);
						const r = [];
						e.forEach(e => {
							var t = {};
							t.title = e.goodsName, t.description = "", t.imageURI = "", t.price = e.amount, t.priceCurrencyCode = e.currencyCode, t.productID = e.goodsId, r.push(t)
						}), n(r)
					} else i({
						code: "android_getCatelogAsync_error",
						message: "" + s
					})
				}
			})
		}
		purchaseAsync(o) {
			return new Promise((n, i) => {
				var e, t = window.AdInteractive;
				t ? (e = V(), t.pay(o.productID, e), this.payResult = (e, t, s, r) => {
					e ? ((e = {}).productID = o.productID, e.paymentID = "", e.purchaseToken = t, e.purchaseTime = h.getTimestamp().toString(), e.signedRequest = "", e.developerPayload = o.developerPayload, this._payType = s, n(e)) : i({
						code: "android_purchaseAsync_error",
						message: "" + r
					})
				}) : i("Android AdInteractive is not exist")
			})
		}
		getPurchasesAsync() {
			return new Promise((n, i) => {
				var e = window.AdInteractive;
				e ? (e.queryUnConsumeOrder(), this.queryUnConsumeOrderResult = (e, t, s) => {
					if (e) {
						console.info("====> queryUnConsumeOrderResult productInfos: ", t);
						e = JSON.parse(t);
						const r = [];
						e.forEach(e => {
							var t = {};
							t.purchaseToken = e.id, t.paymentID = e.thirdUid, t.purchaseTime = h.getTimestamp().toString(), t.productID = e.productId, t.signedRequest = "", r.push(t)
						}), n(r)
					} else i({
						code: "android_getPurchasesAsync_error",
						message: "" + s
					})
				}) : i("Android AdInteractive is not exist")
			})
		}
		consumePurchaseAsync(t) {
			return new Promise((s, r) => {
				var e = window.AdInteractive;
				e ? (e.consume(t, this._payType), this.consumeOrderResult = (e, t) => {
					e ? s() : r({
						code: "android_consumePurchaseAsync_error",
						message: "" + t
					})
				}) : r("Android AdInteractive is not exist")
			})
		}
		onReady(e) {
			e && e()
		}
		onGetAvailableGoodsResult(e, t, s) {
			console.info(`====> onGetAvailableGoodsResult isSuccess: ${e}, productInfos: ${t}, errorMessage: ` + s), this.getAvailableGoodsResult ? this.getAvailableGoodsResult(e, t, s) : console.info("====> getAvailableGoodsResult is not init")
		}
		onQueryUnConsumeOrderResult(e, t, s) {
			console.info(`====> onQueryUnConsumeOrderResult isSuccess: ${e}, productInfos: ${t}, errorMessage: ` + s), this.queryUnConsumeOrderResult ? this.queryUnConsumeOrderResult(e, t, s) : console.info("====> queryUnConsumeOrderResult is not init")
		}
		onPayResult(e, t, s, r) {
			console.info(`====> onPayResult isSuccess: ${e}, orderId: ${t}, errorMessage: ` + r), this.payResult ? this.payResult(e, t, s, r) : console.info("====> payResult is not init")
		}
		onConsumeOrderResult(e, t) {
			console.info(`====> onComsumeOrderResult isSuccess: ${e}, errorMessage: ` + t), this.consumeOrderResult ? this.consumeOrderResult(e, t) : console.info("====> onComsumeOrderResult is not init")
		}
	}
	class Fr {
		constructor() {
			this._payment = null
		}
		static get instance() {
			return this._instance || (this._instance = new Fr), this._instance
		}
		init() {
			var e = window.AdInteractive;
			this._payment = e ? new jr : Nr
		}
		getCatalogAsync() {
			return this._payment.getCatalogAsync()
		}
		purchaseAsync(e) {
			return this._payment.purchaseAsync(e)
		}
		getPurchasesAsync() {
			return this._payment.getPurchasesAsync()
		}
		consumePurchaseAsync(e) {
			return this._payment.consumePurchaseAsync(e)
		}
		onReady(e) {
			this._payment.onReady(e)
		}
		onGetAvailableGoodsResult(e, t, s) {
			var r;
			this._payment && null != (r = this._payment) && r.onGetAvailableGoodsResult(e, t, s)
		}
		onQueryUnConsumeOrderResult(e, t, s) {
			var r;
			this._payment && null != (r = this._payment) && r.onQueryUnConsumeOrderResult(e, t, s)
		}
		onPayResult(e, t, s, r) {
			var n;
			this._payment && null != (n = this._payment) && n.onPayResult(e, t, s, r)
		}
		onConsumeOrderResult(e, t) {
			var s;
			this._payment && null != (s = this._payment) && s.onConsumeOrderResult(e, t)
		}
	}
	Fr._instance = null;
	const C = Fr.instance;
	window.onGetAvailableGoodsResult = C.onGetAvailableGoodsResult.bind(C), window.onQueryUnConsumeOrderResult = C.onQueryUnConsumeOrderResult.bind(C), window.onPayResult = C.onPayResult.bind(C), window.onConsumeOrderResult = C.onConsumeOrderResult.bind(C);
	class Mr extends R {
		static createRequest() {
			return {
				type: Mr.requestType
			}
		}
		static createService() {
			return new Mr(Mr.requestType, !1, Mr.handleRequestAsync)
		}
		static handleRequestAsync(t) {
			return C.getCatalogAsync().then(e => Promise.resolve(k(t, JSON.stringify(e)))).catch(e => Promise.reject(I(t, e.code, e.message)))
		}
	}
	Mr.requestType = "PayInstantCatalogService";
	class qr extends R {
		static createRequest(e) {
			return {
				type: qr.requestType,
				payload: e
			}
		}
		static createService() {
			return new qr(qr.requestType, !1, qr.handleRequestAsync)
		}
		static handleRequestAsync(t) {
			return C.purchaseAsync(t.payload).then(e => Promise.resolve(k(t, e))).catch(e => Promise.reject(I(t, e.code, e.message)))
		}
	}
	qr.requestType = "PayInstantPurchasesService";
	class Lr extends R {
		static createRequest() {
			return {
				type: Lr.requestType
			}
		}
		static createService() {
			return new Lr(Lr.requestType, !1, Lr.handleRequestAsync)
		}
		static handleRequestAsync(t) {
			return C.getPurchasesAsync().then(e => Promise.resolve(k(t, e))).catch(e => Promise.reject(I(t, e.code, e.message)))
		}
	}
	Lr.requestType = "PayInstantGetPurchasesService";
	class Ur extends R {
		static createRequest(e) {
			return {
				type: Ur.requestType,
				payload: e
			}
		}
		static createService() {
			return new Ur(Ur.requestType, !1, Ur.handleRequestAsync)
		}
		static handleRequestAsync(t) {
			var e = t.payload;
			return C.consumePurchaseAsync(e).then(() => Promise.resolve(k(t))).catch(e => Promise.reject(I(t, e.code, e.message)))
		}
	}
	Ur.requestType = "PayInstantConsumePurchaseService";
	class Hr extends R {
		static createRequest(e) {
			return {
				type: Hr.requestType,
				payload: e
			}
		}
		static createService() {
			return new Hr(Hr.requestType, !1, Hr.handleRequestAsync)
		}
		static handleRequestAsync(e) {
			return C.onReady(e.payload), Promise.resolve(k(e))
		}
	}

	function zr(e) {
		return u(this, void 0, void 0, function* () {
			document.querySelector("script[src^='https://securepubads.g.doubleclick.net/tag/js/gpt.js']") || oe("https://securepubads.g.doubleclick.net/tag/js/gpt.js").then(() => {
				window.googletag = window.googletag || {
					cmd: []
				}, console.info("[admanager] init afg success")
			}).catch(e => {
				console.error("[admanager] init afg error: ", e)
			})
		})
	}

	function Wr(e) {
		return u(this, void 0, void 0, function* () {
			document.querySelector("script[src^='https://sdk.minigame.vip/js/adivery.global.js']") || oe("https://sdk.minigame.vip/js/adivery.global.js").then(() => {
				console.info("[adivery] init afg success")
			}).catch(e => {
				console.error("[adivery] init afg error: ", e)
			})
		})
	}

	function $r(e) {
		return u(this, void 0, void 0, function* () {
			document.querySelector("script[src^='https://us-east-web-static.s3.amazonaws.com/sthybrid/dywx-ad-sdk.js']") || oe("https://us-east-web-static.s3.amazonaws.com/sthybrid/dywx-ad-sdk.js").then(() => {
				window.dywxBridge = new window.DYWXBridge((null == e ? void 0 : e.app_id) || "", function () {
					console.log("[JS]: DYWXBridge is ready!")
				}), console.info("[bridge] init afg success")
			}).catch(e => {
				console.error("[bridge] init afg error: ", e)
			})
		})
	}

	function Gr(c) {
		var d, l;
		return u(this, void 0, void 0, function* () {
			console.info("[minigame] initAfg"), window.adsbygoogle = window.adsbygoogle || [];

			function e(e) {
				window.adsbygoogle.push(e)
			}
			var t;
			window.adBreak = e, window.adConfig = e;
			try {
				var s = null == (d = null == c ? void 0 : c.afg) ? void 0 : d.attributes,
					r = (s && "on" !== s["data-adbreak-test"] && delete s["data-adbreak-test"], document.querySelector("script[src^='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js']"));
				if (r) {
					r.getAttribute("data-ad-host") && s["data-ad-channel"] && delete s["data-ad-channel"], !r.getAttribute("data-ad-host") && s["data-ad-host-channel"] && delete s["data-ad-host-channel"];
					for (const o in s) !r.getAttribute(o) && s[o] && 0 < s[o].length && r.setAttribute(o, s[o])
				} else {
					for (const a in s) s[a] || delete s[a];
					oe("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", !0, s).then(() => { }).catch(e => {
						console.error("[minigame] init afg error: ", e)
					})
				}
				var n, i = null == (l = null == c ? void 0 : c.afg) ? void 0 : l.config;
				i && (n = {}, i.preloadAdBreaks && (n.preloadAdBreaks = i.preloadAdBreaks), i.onReady && (n.onReady = () => {
					console.info("afg ==> ready")
				}), window.adConfig(n), t = i, console.info("setAfgOption", t), wr = t, "auto" === i.preloadAdBreaks) && (yield h.waitTime(1e3), Br())
			} catch (e) {
				console.error("init Afg error: ", e.message)
			}
		})
	}

	function Kr(r) {
		return u(this, void 0, void 0, function* () {
			try {
				var e, t, s = r || function () {
					var e = new URLSearchParams(window.location.search);
					let t = "minigame.json",
						s = !1;
					return e.has("mn_config") && (t = e.get("mn_config"), console.debug("[minigame] config: ", t), s = !0), !s && e.has("mn_channel") && (e = e.get("mn_channel"), console.debug("[minigame] channel: ", e), t = e + ".json"), t
				}();
				return window.AdInteractive ? (n = s, e = yield new Promise((t, s) => {
					const r = new XMLHttpRequest;
					r.open("GET", n), r.onload = function () {
						var e;
						200 === r.status ? (e = JSON.parse(r.responseText), console.info("config loaded:", e), t(e)) : s({
							message: "fail to get config data from " + n
						})
					}, r.onerror = function () {
						s({
							message: "fail to get config data from : " + r.statusText
						})
					}, r.send()
				}), Promise.resolve(e)) : (t = yield (yield fetch(s)).json(), Promise.resolve(t))
			} catch (e) {
				return console.error("[minigame] load minigame option error: ", e), Promise.reject(e)
			}
			var n
		})
	}
	Hr.requestType = "PayInstantOnReadyService";
	var Vr, Yr, T, B;

	function D() {
		console.warn("[minigame] gaEvent is invalid!")
	}
	window.gaEvent = null;
	class Jr {
		constructor() {
			this._runningAsyncTask = null, this._queues = [], this._isProcessingTaskUUID = 0, this._enable = !0, this.complete = null
		}
		get queues() {
			return this._queues
		}
		get enable() {
			return this._enable
		}
		set enable(e) {
			this._enable !== e && (this._enable = e) && 0 < this.size && this.play()
		}
		push(e, t = null) {
			var s = Jr._$uuid_count++;
			return this._queues.push({
				uuid: s,
				callbacks: [e],
				params: t
			}), s
		}
		pushMulti(e, ...t) {
			var s = Jr._$uuid_count++;
			return this._queues.push({
				uuid: s,
				callbacks: t,
				params: e
			}), s
		}
		remove(t) {
			var e;
			if ((null == (e = this._runningAsyncTask) ? void 0 : e.uuid) === t) console.warn("A running task cannot be removed");
			else
				for (let e = 0; e < this._queues.length; e++)
					if (this._queues[e].uuid === t) {
						this._queues.splice(e, 1);
						break
					}
		}
		get size() {
			return this._queues.length
		}
		get isProcessing() {
			return 0 < this._isProcessingTaskUUID
		}
		get isStop() {
			return !(0 < this._queues.length || this.isProcessing)
		}
		get runningParams() {
			return this._runningAsyncTask ? this._runningAsyncTask.params : null
		}
		clear() {
			this._queues = [], this._isProcessingTaskUUID = 0, this._runningAsyncTask = null
		}
		next(e, t = null) {
			this._isProcessingTaskUUID === e ? (this._isProcessingTaskUUID = 0, this._runningAsyncTask = null, this.play(t)) : this._runningAsyncTask && console.info("====> runningAsyncTask: ", this._runningAsyncTask)
		}
		step() {
			this.isProcessing && this.next(this._isProcessingTaskUUID)
		}
		play(s = null) {
			if (!this.isProcessing && this._enable) {
				var r = this._queues.shift();
				if (r) {
					const a = (this._runningAsyncTask = r).uuid;
					this._isProcessingTaskUUID = a;
					var n = r.callbacks;
					if (1 === n.length) n[0]((e = null) => {
						this.next(a, e)
					}, r.params, s);
					else {
						let t = n.length;
						const c = [];
						var i = (e = null) => {
							--t, c.push(e || null), 0 === t && this.next(a, c)
						},
							o = t;
						for (let e = 0; e < o; e++) n[e](i, r.params, s)
					}
				} else this._isProcessingTaskUUID = 0, this._runningAsyncTask = null, this.complete && this.complete(s)
			}
		}
		yieldTime(n, i = null) {
			this.push(function (e, t, s) {
				const r = setTimeout(() => {
					clearTimeout(r), i && i(), e(s)
				}, n)
			}, {
				des: "AsyncQueue.yieldTime"
			})
		}
		static excuteTimes(e, t = null) {
			let s = e;
			return () => {
				0 === --s && t && t()
			}
		}
	}
	Jr._$uuid_count = 1;
	class Xr {
		constructor(e) {
			this._isReward = !1, this._adInstants = [], this._curAdInstant = null, this._refreshTotalShowTimeCallback = null, this._isFinish = !1, this._isReward = e
		}
		get IsFinish() {
			return this._isFinish
		}
		set refreshTotalShowTimeCallback(e) {
			this._refreshTotalShowTimeCallback = e
		}
		get refreshTotalShowTimeCallback() {
			return this._refreshTotalShowTimeCallback
		}
		getCurAdName() {
			return ""
		}
		onShowAdsResult(e, t) {
			var s;
			console.info(`onShowAdsResult: isSuccess: ${e}, errMessage: ${t}, this._curAdInstant: ` + this._curAdInstant), this._curAdInstant && null != (s = this._curAdInstant) && s.onShowAdsResult(e, t)
		}
	} (et = Vr = Vr || {}).PREROLL = "preroll", et.INTERSTITIAL = "interstitial", et.REWARDED = "reward", et.BANNER = "banner";
	class Qr {
		constructor(e, t, s, r) {
			this._strategyName = "AdsStrategy", this._placementId = e, this._isRewarded = t, this._isOpened = !0, this._type = this._isRewarded ? Vr.REWARDED : Vr.INTERSTITIAL, console.info("AdsStrategy constructor placementId: type: strategyName", e, this._type, this._strategyName)
		}
		getPlacementID() {
			return this._placementId
		}
		getType() {
			return this._type
		}
		setType(e) {
			this._type = e
		}
		getRewardedType() {
			return this._isRewarded
		}
		setRewardedType(e) {
			this._isRewarded = e
		}
		getIsOpened() {
			return this._isOpened
		}
		setIsOpened(e) {
			this._isOpened = e
		}
		getStrategyName() {
			return this._strategyName
		}
		setAdsCallback(e) {
			this._adsCallback = e
		}
		getAdsCallbackOption() {
			return this._adsCallback
		}
	}
	class Zr extends Qr {
		constructor() {
			super(...arguments), this._strategyName = "AfgStrategy"
		}
		loadAsync() {
			console.log("chay vao mini sdk")
			return Ir(), hr(() => Ar(), 1e3).then(() => (console.info("[AFG] Ads loaded"), Promise.resolve())).catch(e => (console.info("[AFG] Ads load error: ", e), Promise.reject(e)))
		}
		showAsync() {
			return u(this, void 0, void 0, function* () {
				var e = {
					isRewardedAd: this.getRewardedType(),
					placementId: this.getPlacementID(),
					uid: ""
				},
					t = e.isRewardedAd ? pr.reward : pr.next,
					e = e.placementId;
				console.info(`===> show ad: ${t}|` + e);
				try {
					return yield Cr(t, e, this.getAdsCallbackOption()), console.info("[AFG] show ads: success"), Promise.resolve()
				} catch (e) {
					return console.info("[AFG] show ads: error: ", e), Promise.reject(e)
				}
			})
		}
		isReady() {
			return Ar()
		}
	} (T = Yr = Yr || {})[T.AdTypeEnumNull = 0] = "AdTypeEnumNull", T[T.Display = 1] = "Display", T[T.Float = 2] = "Float", T[T.Banner = 3] = "Banner", T[T.Interstitial = 4] = "Interstitial", T[T.Rewarded = 5] = "Rewarded";
	class en {
		constructor() {
			this._mdaRewordInfos = [], this._mdaInterstitialInfos = [], this._url = "" + ee.DOMAIN + ee.BATCH_API_PATH
		}
		static get instance() {
			return this._instance || (this._instance = new en), this._instance
		}
		setTest(e) {
			e && (this._url = "" + ee.TESTDOMAIN + ee.BATCH_API_PATH)
		}
		fetchMdaData(n) {
			return u(this, void 0, void 0, function* () {
				try {
					var e, t = n === Yr.Rewarded ? "_mdaRewordInfos" : "_mdaInterstitialInfos";
					if (0 < this[t].length) return e = this[t].shift(), Promise.resolve(e);
					var s = yield X(this._url, {
						batch: [{
							adType: n,
							count: 3
						}]
					});
					if (console.info("====> MDA Info: ", s), 200 !== s.code) return Promise.reject({
						code: "REQUEST_MDA_ERROR",
						message: s.message
					});
					this[t] = this[t].concat(s.data.ads);
					var r = this[t].shift();
					return Promise.resolve(r)
				} catch (e) {
					return Promise.reject({
						code: "FETCH_MDS_ERROR",
						message: e.message
					})
				}
			})
		}
	}
	en._instance = null;
	const tn = en.instance,
		sn = {
			interstitial: 0,
			rewardedVideo: 0,
			banner: 0
		},
		rn = {
			close: "close",
			adLoaded: "finish",
			adLoadError: "loadError",
			click: "click"
		};
	class nn {
		constructor(e, t, s) {
			this.adid = e.id, this.adType = e.type, this.adTargetUrl = e.target_url, this.adMaterial = e.material_url, this.adTemplateUrl = e.template_url, this.adShowAttributeUrl = e.show_attribute_url, this.playLimitTime = e.impression, this.iframe = null, this.adTargetObj = null, this.isInit = !1, this.timeStamp = (new Date).getTime().toString(), this.gaId = t, this.cbOptions = s
		}
		getIframe() {
			return this.iframe
		}
		getGaId() {
			return this.gaId
		}
		getAdType() {
			return this.adType
		}
		getAdTargetUrl() {
			return this.adTargetUrl
		}
		getAdMaterial() {
			return this.adMaterial
		}
		getAdTemplateUrl() {
			return this.adTemplateUrl
		}
		getTimeStamp() {
			return this.timeStamp
		}
		getAdId() {
			return this.adid
		}
		getInit() {
			return this.isInit
		}
		getPlayLimitTime() {
			return this.playLimitTime
		}
		getShowAttributeUrl() {
			return this.adShowAttributeUrl
		}
		onShow() {
			var e;
			null != (e = this.cbOptions) && e.onShow()
		}
		onSuccess() {
			var e;
			null != (e = this.cbOptions) && e.onSuccess()
		}
		onFail() {
			var e;
			null != (e = this.cbOptions) && e.onFail()
		}
		onClose() {
			var e;
			null != (e = this.cbOptions) && e.onClose()
		}
		onClick() {
			var e;
			null != (e = this.cbOptions) && e.onClick()
		}
		createIframe() {
			return new Promise((e, t) => {
				const s = window.document.createElement("iframe");
				s.setAttribute("style", "overflow: hidden !important; width: 100vw !important; height: 100vh !important; top:0 !important; right:0 !important; bottom:0 !important; left:0 !important; position: fixed !important; clear: none !important; display: none !important; float: none !important; margin: 0px !important; max-height: none !important; max-width: none !important; opacity: 1 !important; padding: 0px !important; vertical-align: baseline !important; visibility: visible !important; z-index: 1000000000 !important;"), s.setAttribute("src", this.adTemplateUrl), s.setAttribute("id", "minigameiframe"), s.setAttribute("marginwidth", "0"), s.setAttribute("frameborder", "0"), s.setAttribute("marginheight", "0"), s.setAttribute("scrolling", "no"), window.document.querySelector("html").appendChild(s), s.onload = function () {
					console.info("iframe loaded"), e(s)
				}, s.onerror = function (e) {
					console.error("fail to load iframe: ", e), t(new Error(e.toString()))
				}
			})
		}
		showIframe() {
			this.iframe.setAttribute("style", "overflow: hidden !important; width: 100vw !important; height: 100vh !important; top:0 !important; right:0 !important; bottom:0 !important; left:0 !important; position: fixed !important; clear: none !important; display: inline !important; float: none !important; margin: 0px !important; max-height: none !important; max-width: none !important; opacity: 1 !important; padding: 0px !important; vertical-align: baseline !important; visibility: visible !important; z-index: 1000000000 !important;")
		}
		removeIframe() {
			this.isInit && this.iframe.remove(), this.isInit = !1
		}
		initAsync() {
			return u(this, void 0, void 0, function* () {
				try {
					if (this.iframe = yield this.createIframe(), null === this.iframe) throw console.warn("fail to create iframe"), {
						code: "NO_IFRAME",
						msg: "fail to create iframe"
					};
					switch (this.adType) {
						case sn.interstitial:
						case sn.rewardedVideo:
							this.adTargetObj = new on(this);
							break;
						case sn.banner:
							throw {
								code: "NO_BANNER", msg: "feature is under development"
							}
					}
					var e = {
						adTargetUrl: this.adTargetUrl,
						adMaterial: this.adMaterial,
						timeStamp: this.timeStamp,
						adId: this.adid,
						gaId: this.gaId,
						showAd: !1
					};
					return this.adTargetObj.loadAd(e, this.iframe), window.removeEventListener("message", this.receiveMessageFromIframePage.bind(this), !1), window.addEventListener("message", this.receiveMessageFromIframePage.bind(this), !1), this.isInit = !0, this.adTargetObj
				} catch (e) {
					throw console.error("fail to init minigame ads: ", e), new Error(e.toString())
				}
			})
		}
		receiveMessageFromIframePage(e) {
			if (e.data && (e.data.action && this.timeStamp === e.data.timeStamp && (console.info("receive message from iframe: ", e), this.isInit))) switch (e.data.action) {
				case rn.close:
					this.adTargetObj.closeAd(), this.onClose();
					break;
				case rn.adLoaded:
					this.adTargetObj.ready = !0;
					break;
				case rn.adLoadError:
					this.adTargetObj.ready = !1;
					break;
				case rn.click:
					this.onClick()
			}
		}
	}
	class on extends class {
		set ready(e) {
			var t;
			this.isReady = e, null != (t = this.adLoadedEvent) && t.call(e)
		}
		get ready() {
			return this.isReady
		}
		constructor(e) {
			this.adCloseEvent = null, this.adLoadedEvent = null, this.adIframe = e
		}
		loadAd(e, t) {
			this.timeStamp = e.timeStamp, console.info("send message to iframe: ", e), t.contentWindow.postMessage(e, "*")
		}
		showAd() {
			return new Promise((e, t) => {
				let s = !1;
				return this.adIframe.getInit() && (this.adIframe.showIframe(), s = !0), s
			})
		}
		closeAd() {
			let e = !1;
			return this.adIframe.getInit() && (this.adIframe.removeIframe(), e = !0), e
		}
		getAdId() {
			return this.adIframe.getAdId()
		}
		getPlayLimitTime() {
			return this.adIframe.getPlayLimitTime()
		}
	} {
		constructor(e) {
			super(e), this.ready = !1
		}
		showAd() {
			return new Promise((e, t) => {
				try {
					this.adIframe.onShow(), this.adCloseEvent = {}, this.adCloseEvent.call = () => {
						e()
					};
					const s = {
						adTargetUrl: this.adIframe.getAdTargetUrl(),
						adShowAttributeUrl: this.adIframe.getShowAttributeUrl(),
						adMaterial: this.adIframe.getAdMaterial(),
						timeStamp: this.adIframe.getTimeStamp(),
						gaId: this.adIframe.getGaId(),
						adId: this.adIframe.getAdId(),
						adType: this.adIframe.getAdType(),
						showAd: !0
					};
					super.showAd() && this.ready ? (this.adIframe.getIframe().contentWindow.postMessage(s, "*"), this.adIframe.onSuccess()) : (this.adLoadedEvent = {}, this.adLoadedEvent.call = e => {
						e ? (this.adIframe.getIframe().contentWindow.postMessage(s, "*"), this.adIframe.onSuccess()) : (this.adIframe.onFail(), t({
							code: "not ready",
							msg: "fail to show ad due to not ready"
						}))
					})
				} catch (e) {
					console.error(e), t({
						code: "not ready",
						msg: "fail to show ad due to not ready:" + e
					}), this.adIframe.onFail()
				}
			})
		}
		closeAd() {
			var e;
			let t = !1;
			try {
				super.closeAd() && (t = !0, null != (e = this.adCloseEvent)) && e.call()
			} catch (e) {
				console.error(e)
			}
			return t
		}
	}
	window.createAdIframe = function (e, t, s) {
		return u(this, void 0, void 0, function* () {
			try {
				return yield new nn(e, t, s).initAsync()
			} catch (e) {
				throw {
					code: "load_ad_error",
					message: "load ad error: " + e.message
				}
			}
		})
	};
	class an extends Qr {
		constructor() {
			super(...arguments), this._curAd = null, this._strategyName = "MdaStrategy", this._isStartLoad = !1, this._isLoaded = !1, this._loadedCallback = null
		}
		loadAsync() {
			return u(this, void 0, void 0, function* () {
				try {
					var e = {
						Interstitial: 0,
						Rewarded: 0
					},
						t = yield tn.fetchMdaData(this.getRewardedType() ? Yr.Rewarded : Yr.Interstitial), s = {}, r = (s.id = t.id, s.type = this.getRewardedType() ? e.Rewarded : e.Interstitial, s.template_url = t.template_url, s.material_url = t.material.url, s.target_url = t.target_url, s.show_attribute_url = t.show_attribute_url, s.support_country = [], s.support_language = [], s.impression = 0, new nn(s, "", this.getAdsCallbackOption()));
					return console.info("====> MDA start load"), this._isStartLoad = !0, this._curAd = yield r.initAsync(), this._isLoaded = !0, console.info("====> MDA load success"), Promise.resolve()
				} catch (e) {
					return console.info("====> MDA load error: ", e), Promise.reject({
						code: "MDA_LOAD_ERROR",
						message: e.message
					})
				}
			})
		}
		setEventCallback() {
			this.setAdsCallback({
				onShow: () => {
					console.log(" =======> MDA show")
				},
				onSuccess: () => {
					console.log(" =======> MDA success")
				},
				onFail: () => {
					console.log(" =======> MDA failed")
				},
				onClick: () => {
					console.log(" =======> MDA clicked")
				},
				onClose: () => {
					console.log(" =======> MDA closed")
				}
			})
		}
		showAsync() {
			return u(this, void 0, void 0, function* () {
				try {
					return this._curAd ? (yield this._curAd.showAd(), console.info("====> MDA show success"), Promise.resolve()) : Promise.reject({
						code: "NO_ADS",
						message: "[MDA] no ads"
					})
				} catch (e) {
					return console.info("====> MDA show error: ", e), Promise.reject({
						code: "MDA_SHOW_ERROR",
						message: e.message
					})
				}
			})
		}
		isReady() {
			return this._curAd && this._curAd.ready
		}
	}
	class cn extends Qr {
		constructor() {
			super(...arguments), this._strategyName = "AndroidStrategy", this._showAdsResult = null
		}
		loadAsync() {
			return new Promise((e, t) => {
				e()
			})
		}
		showAsync() {
			return new Promise((t, s) => {
				if (window.AdInteractive) {
					if (this.getRewardedType()) {
						var e = window.AdInteractive.isRewardedVideoAdReady();
						if (console.info("isRewardReady: ", e), !e) return console.info("android show Reward ads fail by not ready"), void s({
							code: "android show fail",
							message: "android show Reward ads fail by not ready"
						});
						window.AdInteractive.showRewardedVideoAd()
					} else {
						/*if (!window.AdInteractive.isInterstitialAdReady()) return void s({
							code: "android show fail",
							message: "android show Inters ads fail by not ready"
						});
						window.AdInteractive.showInterstitialAd()*/
					}
					this._showAdsResult = e => {
						t()
					}
				} else s("Android AdInteractive not exist")
			})
		}
		isReady() {
			return !0
		}
		onShowAdsResult(e, t) {
			console.info("====> android call back show success: ", e), this._showAdsResult ? this._showAdsResult(e, t) : console.info("====> android show ads result error")
		}
	}
	const dn = {
		addCallbackEvent(e) {
			e && 0 < e.length && e.forEach(t => {
				t.ele && t.ele.addEventListener(t.eventName, e => {
					t.eventFunc && t.eventFunc(e)
				})
			})
		},
		createDailogContainer() {
			let e = document.getElementById("minigameDailogContainer");
			return e || ((e = document.createElement("div")).setAttribute("id", "minigameDailogContainer"), e.setAttribute("style", "font-size: 16px;font-family: Microsoft YaHei;font-weight: 400; position: fixed;top:0;  z-index: 20000; overflow: hidden; width: 100vw;height: 100vh; background-color: rgb(0, 0, 0,0.6);"), document.body.append(e)), e
		},
		removeDailogContainer(e) {
			var t = document.getElementById("minigameDailogContainer");
			t && t.childNodes && t.childNodes.length <= 1 ? t && t.remove() : e && e instanceof Function && e()
		}
	};
	class ln {
		constructor(e, t) {
			this.currentContainerElement = null, this.currentContainerParentElement = null, this.currentSpecialContainerRootElement = null, this.ifCommonAd = !0, this.container = null, this.adProperties = null, this.adCloseCallback = null, this.adsCallBack = null, this.currentContainerElement = null, this.currentContainerParentElement = null, this.currentSpecialContainerRootElement = null, e && e.containerObj && (this.container = e.containerObj), e.adProperties ? this.adProperties = e.adProperties : this.adProperties = {}, this.ifCommonAd = e.ifCommonAd, this.adsCallBack = t, this.loadScript()
		}
		showAd(n) {
			return u(this, void 0, void 0, function* () {
				return new Promise((s, r) => u(this, void 0, void 0, function* () {
					var e, t;
					try {
						null != (t = this.adsCallBack) && t.onShow(), this.ifCommonAd ? yield this._addAdToContainer() : yield this._addAdToSpecilContainer(n), null != (e = this.adsCallBack) && e.onSuccess(), this.adCloseCallback = {}, this.adCloseCallback.call = () => {
							var e;
							s(), null != (e = this.adsCallBack) && e.onClose()
						}
					} catch (e) {
						null != (t = this.adsCallBack) && t.onFail(), r({
							code: "show taboola ad error",
							message: e.message
						})
					}
				}))
			})
		}
		closeAd() {
			var e;
			return this.ifCommonAd && this.currentContainerElement ? (null != (e = this.adCloseCallback) && e.call(), this.currentContainerElement.remove(), Promise.resolve(!0)) : !this.ifCommonAd && this.currentSpecialContainerRootElement ? (null != (e = this.adCloseCallback) && e.call(), this._removeSpecilContainer(), Promise.resolve(!0)) : Promise.resolve(!1)
		}
		loadScript() {
			var e, t, s, r;
			ln.ifLoadScript || (window._taboola = window._taboola || [], _taboola.push({
				article: "auto"
			}), e = document.createElement("script"), t = document.getElementsByTagName("script")[0], s = "//cdn.taboola.com/libtrc/minigame-network/loader.js", r = "tb_loader_script", document.getElementById(r) || (e.async = 1, e.src = s, e.id = r, t.parentNode.insertBefore(e, t)), window.performance && "function" == typeof window.performance.mark && window.performance.mark("tbl_ic"), ln.ifLoadScript = !0)
		}
		_setAttributesToElememt(e, t) {
			if (e && t)
				for (const r in e) {
					var s;
					Object.hasOwnProperty.call(e, r) && (s = e[r], t.setAttribute(r, s))
				}
		}
		_addAdToContainer() {
			try {
				var t = document.createElement("div"),
					s = (t.setAttribute("id", this.container.id), this.currentContainerElement = t, this._setAttributesToElememt(this.container.propertysObj, t), document.querySelector("" + this.container.containerStr));
				if (s)
					if (this.currentContainerParentElement = s, this.container.ifInsertBefore) {
						let e = null;
						s.hasChildNodes() && (e = s.childNodes[0]), s.insertBefore(t, e)
					} else s.appendChild(t);
				return Promise.resolve(!0).then(e => (this._setAd(), this._displayAd(), e))
			} catch (e) {
				return console.error("show taboola ad is error", e), Promise.resolve(!1)
			}
		}
		_addAdToSpecilContainer(t) {
			try {
				var e = `    
        <div style="overflow: hidden;width: 100vw;height: 100vh;background-color: #262626;">
            <div style="display: flex;justify-content: center;border: 1px solid transparent;border-radius: 4px;height: 8vh;background-color: #424242;line-height: 8vh;font-family: Google Sans, Roboto, Arial, sans-serif;font-size: 20px;color: #f5f5f5">
                Ad
                <div style="display: flex;position: absolute;right: 0;flex-direction: row;align-items: center;padding-right: 4%;height: inherit;cursor: pointer;">
                    <div>
                        <div id="closeAd" style="display: ${t.closeTime < 0 ? "flex" : "none"};align-items: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path style="fill: #f5f5f5"
                                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z">
                                </path>
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                            </svg>
                        </div>
                        <div id="autoSkidAd" style="display:${0 <= t.closeTime ? "block" : "none"}; font-size: 12px">
                        Reward in <span id="autoSkidAdNum">${t.closeTime}</span> seconds
                        </div>
                    </div>
                </div>
            </div>
            <div id="specilContainerTaboolaAd" style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 100vw;height: 92vh;">

            </div>
        </div>
        `,
					s = document.createElement("div"),
					r = (s.setAttribute("style", "position: absolute;z-index:5;width:100%;height:100%"), s.innerHTML = e, dn.createDailogContainer().append(s), this.currentContainerParentElement = s.querySelector("#specilContainerTaboolaAd"), this.currentSpecialContainerRootElement = s, document.createElement("div"));
				r.setAttribute("id", this.container.id), this.currentContainerElement = r, this._setAttributesToElememt(this.container.propertysObj, r), this.currentContainerParentElement.appendChild(r);
				const n = s.querySelector("#closeAd"),
					i = s.querySelector("#autoSkidAd"),
					o = s.querySelector("#autoSkidAdNum"),
					a = (n.addEventListener("click", () => {
						this.closeAd()
					}), e => {
						o.innerText = e, e--, setTimeout(() => {
							0 < (o.innerText = e) ? a(e) : t.ifautoClose ? this.closeAd() : (n.style.display = "flex", i.style.display = "none")
						}, 1e3)
					});
				return a(t.closeTime), Promise.resolve(!0).then(e => (this._setAd(), this._displayAd(), e))
			} catch (e) {
				return console.error("show taboola ad is error", e), Promise.resolve(!1)
			}
		}
		_removeSpecilContainer() {
			dn.removeDailogContainer(() => {
				this.currentSpecialContainerRootElement && this.currentSpecialContainerRootElement.remove()
			})
		}
		_setAd() {
			window._taboola = window._taboola || [], window._taboola.push(Object.assign({
				target_type: "mix"
			}, this.adProperties))
		}
		_displayAd() {
			window._taboola = window._taboola || [], window._taboola.push({
				flush: !0
			})
		}
	}
	ln.ifLoadScript = !1;
	class un extends ln {
		constructor(e) {
			e.ifCommonAd = !0, super(e)
		}
		showAd() {
			return super.showAd()
		}
		closeAd() {
			return super.closeAd()
		}
	}
	class hn extends ln {
		constructor(e, t) {
			e.taboolaParam.ifCommonAd = !1, e.closeInfo.closeTime = -1, super(e.taboolaParam, t), this.closeProperties = null, this.closeProperties = e.closeInfo
		}
		showAd() {
			return super.showAd(this.closeProperties)
		}
		closeAd() {
			return super.closeAd().then(e => (this.closeProperties.closeBackFunc && this.closeProperties.closeBackFunc instanceof Function && this.closeProperties.closeBackFunc(), e))
		}
	}
	class mn extends ln {
		constructor(e, t) {
			e.taboolaParam.ifCommonAd = !1, super(e.taboolaParam, t), this.closeProperties = null, this.closeProperties = e.closeInfo
		}
		showAd() {
			return super.showAd(this.closeProperties)
		}
		closeAd() {
			return super.closeAd().then(e => (this.closeProperties.closeBackFunc && this.closeProperties.closeBackFunc instanceof Function && this.closeProperties.closeBackFunc(), e))
		}
	}
	class pn extends Qr {
		constructor() {
			super(...arguments), this._curAd = null, this._strategyName = "TaboolaStrategy"
		}
		loadAsync() {
			try {
				var e = {
					taboolaParam: {
						containerObj: {
							id: "taboola-mobile-below-article-thumnbnails_interstitial",
							propertysObj: {
								style: "width: 340px;height:450px;overflow: hidden;margin: auto;background: white;"
							}
						},
						adProperties: {
							mode: "thumbnails-a1",
							container: "taboola-mobile-below-article-thumnbnails_interstitial",
							placement: "Mobile below article thumnbnails_Interstitial" + (this.getRewardedType() ? `_${window.channelName}.rewarded` : `_${window.channelName}.interstitial`)
						},
						ifCommonAd: !1
					},
					closeInfo: {
						closeTime: 5,
						ifautoClose: !1,
						closeBackFunc: () => { }
					}
				};
				return this.getRewardedType() ? (e.closeInfo.closeBackFunc = () => {
					console.info("TaboolaRewardAd close")
				}, this._curAd = new mn(e, this.getAdsCallbackOption())) : (e.closeInfo.closeBackFunc = () => {
					console.info("TaboolaInterstitialAd close")
				}, this._curAd = new hn(e, this.getAdsCallbackOption())), Promise.resolve()
			} catch (e) {
				return Promise.reject({
					code: `load ${this.getRewardedType() ? "TaboolaRewardedVideoAd" : "TaboolaInterstitialAd"} error`,
					message: e
				})
			}
		}
		showAsync() {
			return u(this, void 0, void 0, function* () {
				try {
					return yield this._curAd.showAd(), Promise.resolve()
				} catch (e) {
					return Promise.reject({
						code: `show ${this.getRewardedType() ? "TaboolaRewardedVideoAd" : "TaboolaInterstitialAd"} error`,
						message: e
					})
				}
			})
		}
		isReady() {
			return !0
		}
	}
	class gn {
		constructor(e, t, s) {
			this.adName = "", this.dailogContainerElement = null, this.currentContainerElement = null, this.currentContainerParentElement = null, this.currentSpecialContainerRootElement = null, this.container = null, this.adCloseCallback = null, this.adsCallBack = null, this.displayAdFunc = null, this.closeProperties = null, this.ifContainerOnLoad = !1, this.currentContainerElement = null, this.currentContainerParentElement = null, this.currentSpecialContainerRootElement = null, this.ifContainerOnLoad = t, e && (this.closeProperties = e.closeInfo, e.surfaceParam) && (e.surfaceParam.containerObj && (this.container = e.surfaceParam.containerObj), this.adName = e.surfaceParam.adName || "packageSurfaceAd", e.surfaceParam.preloadFunc instanceof Function && (this.preloadFunc = e.surfaceParam.preloadFunc), this.displayAdFunc = e.surfaceParam.displayAdFunc), this.adsCallBack = s
		}
		setClosePropertiesFunc(e) {
			e && (this.closeProperties = e)
		}
		loadAd() {
			return new Promise((e, t) => u(this, void 0, void 0, function* () {
				try {
					this.preloadFunc && this.preloadFunc(), this.ifContainerOnLoad && (yield this._addAdToSpecilContainer()), e()
				} catch (e) {
					t({
						code: `load ${this.adName} ad error`,
						message: e.message
					})
				}
			}))
		}
		showAd() {
			return new Promise((s, r) => u(this, void 0, void 0, function* () {
				var e, t;
				try {
					null != (t = this.adsCallBack) && t.onShow(), this.ifContainerOnLoad || (yield this._addAdToSpecilContainer()), this.timeFunc(this.closeProperties.closeTime), this.dailogContainerElement.style.display = "", this.currentSpecialContainerRootElement.style.display = "", null != (e = this.adsCallBack) && e.onSuccess(), this.adCloseCallback = {}, this.adCloseCallback.call = () => {
						var e;
						s(), null != (e = this.adsCallBack) && e.onClose()
					}
				} catch (e) {
					null != (t = this.adsCallBack) && t.onFail(), r({
						code: `show ${this.adName} ad error`,
						message: e.message
					})
				}
			}))
		}
		closeAd() {
			var e;
			return this.currentSpecialContainerRootElement ? (null != (e = this.adCloseCallback) && e.call(), this.dailogContainerElement.style.display = "none", this._removeSpecilContainer(), this.closeProperties.closeBackFunc && this.closeProperties.closeBackFunc instanceof Function && this.closeProperties.closeBackFunc(), Promise.resolve(!0)) : Promise.resolve(!1)
		}
		_setAttributesToElememt(e, t) {
			if (e && t)
				for (const r in e) {
					var s;
					Object.hasOwnProperty.call(e, r) && (s = e[r], t.setAttribute(r, s))
				}
		}
		_addAdToSpecilContainer() {
			const t = this.closeProperties;
			try {
				var e = `    
        <div style="overflow: hidden;width: 100vw;height: 100vh;background-color: #262626;">
            <div style="display: flex;justify-content: center;border: 1px solid transparent;border-radius: 4px;height: 8vh;background-color: #424242;line-height: 8vh;font-family: Google Sans, Roboto, Arial, sans-serif;font-size: 20px;color: #f5f5f5">
                Ad
                <div style="display: flex;position: absolute;right: 0;flex-direction: row;align-items: center;padding-right: 4%;height: inherit;cursor: pointer;">
                    <div>
                        <div id="closeAd" style="display: ${t.closeTime < 0 ? "flex" : "none"};align-items: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path style="fill: #f5f5f5"
                                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z">
                                </path>
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                            </svg>
                        </div>
                        <div id="autoSkidAd" style="display:${0 <= t.closeTime ? "block" : "none"}; font-size: 12px">
                        Reward in <span id="autoSkidAdNum">${t.closeTime}</span> seconds
                        </div>
                    </div>
                </div>
            </div>
            <div id="specilContainerSurfaceAd" style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 100vw;height: 92vh;">

            </div>
        </div>
        `,
					s = document.createElement("div"),
					r = (s.setAttribute("style", "position: absolute;z-index:5;width:100%;height:100%"), s.innerHTML = e, this.currentContainerParentElement = s.querySelector("#specilContainerSurfaceAd"), this.currentSpecialContainerRootElement = s, document.createElement("div"));
				r.setAttribute("id", this.container.id), this.container.text && (r.innerHTML = this.container.text), this.currentContainerElement = r, this._setAttributesToElememt(this.container.propertysObj, r), this.currentContainerParentElement.appendChild(r);
				const n = s.querySelector("#closeAd"),
					i = s.querySelector("#autoSkidAd"),
					o = s.querySelector("#autoSkidAdNum");
				return n.addEventListener("click", () => {
					this.closeAd()
				}), this.timeFunc = e => {
					o.innerText = e, e--, setTimeout(() => {
						0 < (o.innerText = e) ? this.timeFunc(e) : t.ifautoClose ? this.closeAd() : (n.style.display = "flex", i.style.display = "none")
					}, 1e3)
				}, this.dailogContainerElement = l.createDailogContainer(!0), this.currentSpecialContainerRootElement.style.display = "none", this.dailogContainerElement.append(s), Promise.resolve(!0).then(e => (this._displayAd(), e))
			} catch (e) {
				return console.error(`add to ${this.adName} specil container is error`, e), Promise.resolve(!1)
			}
		}
		_removeSpecilContainer() {
			l.removeDailogContainer(() => {
				this.currentSpecialContainerRootElement && this.currentSpecialContainerRootElement.remove()
			})
		}
		_displayAd() {
			this.displayAdFunc && this.displayAdFunc()
		}
	}
	class yn extends gn {
		constructor(e, t, s) {
			super(e, t, s), e.closeInfo.closeTime = -1, this.setClosePropertiesFunc(e.closeInfo)
		}
		loadAd() {
			return super.loadAd()
		}
		showAd() {
			return super.showAd()
		}
		closeAd() {
			return super.closeAd().then(e => e)
		}
	}
	class fn extends gn {
		constructor(e, t, s) {
			super(e, t, s), this.setClosePropertiesFunc(e.closeInfo)
		}
		loadAd() {
			return super.loadAd()
		}
		showAd() {
			return super.showAd()
		}
		closeAd() {
			return super.closeAd().then(e => e)
		}
	}
	const vn = {
		mda: an,
		adsense: Zr,
		taboola: pn,
		android: cn,
		adivery: class extends Qr {
			constructor() {
				super(...arguments), this._curAd = null, this._strategyName = "AdiveryStrategy"
			}
			loadAsync() {
				return new Promise((t, s) => {
					var e = this.getPlacementID();
					this.getRewardedType() ? Adivery.requestRewardedAd(e).then(e => {
						console.info("adivery Rewarded loaded"), this._curAd = e, t()
					}, e => {
						console.info("Failed to load adivery rewarded: ", e), s({
							code: "ADIVERY_REWARD_LOAD_ERROR",
							message: e.message
						})
					}) : Adivery.requestInterstitialAd(e).then(e => {
						console.log("Interstitial ad loaded"), this._curAd = e, t()
					}, e => {
						console.error("Failed to load interstitial ad", e), s({
							code: "ADIVERY_INTERSTITIAL_LOAD_ERROR",
							message: e.message
						})
					})
				})
			}
			showAsync() {
				return new Promise((t, s) => {
					this._curAd ? this.getRewardedType() ? this._curAd.show().then(e => {
						e ? (console.log("Rewarded ad watched completely"), t()) : (console.log("Rewarded ad closed without reward"), s({
							code: "dismissed",
							message: "Rewarded ad closed without reward"
						}))
					}, e => {
						console.info("Failed to display rewarded ad", e), s({
							code: "ADIVERY_INTERSTITIAL_SHOW_ERROR",
							message: e.message
						})
					}) : this._curAd.show().then(() => {
						console.info("Adivery Interstitial ad displayed"), t()
					}, e => {
						console.info("Adivery Failed to display insterstitial ad", e), s({
							code: "ADIVERY_INTERSTITIAL_SHOW_ERROR",
							message: e.message
						})
					}) : (console.info("adivery instance null"), s({
						code: "ADIVERY_INSTANCE_NULL",
						message: "curAd is null"
					}))
				})
			}
			isReady() {
				return null !== this._curAd
			}
		},
		admanager: class extends Qr {
			constructor() {
				super(...arguments), this._curAd = null, this._strategyName = "AdManagerStrategy"
			}
			loadAsync() {
				return new Promise((t, e) => {
					var c;
					this.getRewardedType() ? (console.log("(admanager placementID is:", this.getPlacementID()), D(), c = this.getPlacementID(), new Promise((r, n) => {
						console.log("admanager loadRewardedSlot");
						const i = window.googletag || {
							cmd: []
						};
						let o = null,
							a;
						i.cmd.push(function () {
							if (o = i.defineOutOfPageSlot(c || "/22817871455/ca-games-pub-3168355978380813-tag", i.enums.OutOfPageFormat.REWARDED)) {
								o.addService(i.pubads());
								const t = function (e) {
									i.pubads().removeEventListener("rewardedSlotReady", t), console.log("admanager rewardedSlotReady", e), a = e, r({
										rewardedSlot: o,
										rewardedSlotReadyEvent: a
									})
								},
									s = (i.pubads().addEventListener("rewardedSlotReady", t), function (e) {
										i.pubads().removeEventListener("slotResponseReceived", s), console.log("admanager slotResponseReceived", e);
										var e = e.slot,
											t = e.getResponseInformation();
										console.log("admanager slotResponseReceived getResponseInformation", t), e !== o || t || n()
									});
								i.pubads().addEventListener("slotResponseReceived", s), i.enableServices(), i.display(o), i.cmd.push(() => {
									i.pubads().refresh([o])
								})
							}
						})
					}).then(({
						rewardedSlotReadyEvent: e
					}) => {
						e ? (D(), console.info("admanager Rewarded loaded"), this._curAd = e) : (D(), console.info("admanager Rewarded not loaded"), console.info("admanager 加载失败，直接 resolve 走保底广告")), t()
					}).catch(e => {
						D(), console.info("admanager Rewarded not loaded, error:", e), console.info("admanager 加载失败，直接 resolve 走保底广告"), t()
					})) : e({
						code: "ADMANAGER_INTERSTITIAL_LOAD_ERROR",
						message: "admanager not support interstitial yet"
					})
				})
			}
			showAsync() {
				return new Promise((t, s) => {
					var o;
					D(), this._curAd ? this.getRewardedType() ? (D(), o = [{
						rewardedSlotReadyEvent: this._curAd
					}["rewardedSlotReadyEvent"]][0], new Promise((n, e) => {
						console.log("admanager makeRewardedVisible", {
							rewardedSlotReadyEvent: o
						});
						const i = window.googletag || {
							cmd: []
						};
						if (o) {
							let r;
							i.cmd.push(() => {
								const t = function (e) {
									i.pubads().removeEventListener("rewardedSlotGranted", t), console.log("admanager rewardedSlotGranted", e), r = e.payload
								},
									s = function (e) {
										i.pubads().removeEventListener("rewardedSlotClosed", s), console.log("admanager rewardedSlotClosed", e), n(r)
									};
								i.pubads().addEventListener("rewardedSlotClosed", s), i.pubads().addEventListener("rewardedSlotGranted", t)
							}), o.makeRewardedVisible()
						}
					}).then(e => {
						e ? (D(), this.getAdsCallbackOption().onSuccess(), console.log("admanager Rewarded ad watched completely"), t()) : (D(), s({
							code: "dismissed",
							message: "Rewarded ad closed without reward"
						}))
					})) : s({
						code: "ADMANAGER_INTERSTITIAL_SHOW_ERROR",
						message: "admanager not support show interstitial yet"
					}) : (console.info("admanager instance null"), D(), s({
						code: "ADMANAGER_INSTANCE_NULL",
						message: "curAd is null"
					}))
				})
			}
			isReady() {
				return null !== this._curAd
			}
		},
		bridge: class extends Qr {
			constructor() {
				super(...arguments), this._curAd = !1, this._strategyName = "BridgeStrategy", this._BridgePlacementId = "ads_minigame_splash", this._options = {}
			}
			loadAsync() {
				return new Promise((t, s) => {
					window.dywxBridge.preloadAd(this._BridgePlacementId, this._options, new window.DYWXBridge.AdCallback({
						onAdLoaded: e => {
							this._curAd = !0, console.log("[bridge]: step into onAdLoaded callback, result:", e), t()
						},
						onAdFailedToLoad: function (e) {
							console.error("[bridge]: step into onAdFailedToLoad, result:", e), s({
								code: "BRIDGE_REWARD_LOAD_ERROR",
								message: e
							})
						}
					}))
				})
			}
			showAsync() {
				return new Promise((t, s) => {
					this._curAd ? window.dywxBridge.showAd(this._BridgePlacementId, this._options, new window.DYWXBridge.AdCallback({
						onAdImpression: e => {
							console.log("[bridge]: step into onAdImpression, result:", e), t()
						},
						onAdError: e => {
							console.log("[bridge]: step into onAdError, result:", e), s({
								code: "dismissed",
								message: "Rewarded ad closed without reward"
							})
						}
					})) : (console.info("[bridge]: bridge instance is not ready"), s({
						code: "BRIDGE_INSTANCE_NOT_READY",
						message: "curAd is fail"
					}))
				})
			}
			isReady() {
				return this._curAd
			}
		},
		packageAdmanager: class extends Qr {
			constructor() {
				super(...arguments), this._curAd = null, this._strategyName = "PackageAdmanagerStrategy", this._curAdName = ""
			}
			loadAsync() {
				return u(this, void 0, void 0, function* () {
					try {
						this._curAdName = this.getRewardedType() ? "PackageAdmanagerRewardAd" : "PackageAdmanagerInterstitialAd";
						const s = this._curAdName + "-display-" + (new Date).getTime(),
							r = this.getPlacementID();
						let e;
						var t = {
							surfaceParam: {
								containerObj: {
									id: s,
									propertysObj: {
										style: "min-width: 300px; min-height: 60px;margin: auto;"
									}
								},
								adName: "PackageAdmanager",
								preloadFunc: () => {
									window.googletag = window.googletag || {
										cmd: []
									}, window.googletag.cmd.push(function () {
										e = window.googletag.defineSlot(r, [
											[300, 250],
											[320, 480],
											[336, 280],
											[300, 600]
										], s).addService(window.googletag.pubads()), window.googletag.enableServices()
									})
								},
								displayAdFunc: () => {
									window.googletag.cmd.push(function () {
										window.googletag.display(s)
									})
								}
							},
							closeInfo: {
								closeTime: 5,
								ifautoClose: !1,
								closeBackFunc: () => { }
							}
						};
						return t.closeInfo.closeBackFunc = () => {
							console.info(this._curAdName + " close")
						}, this.getRewardedType() ? this._curAd = new fn(t, !1, this.getAdsCallbackOption()) : this._curAd = new yn(t, !1, this.getAdsCallbackOption()), yield this._curAd.loadAd(), Promise.resolve()
					} catch (e) {
						return Promise.reject({
							code: `load ${this._curAdName} error`,
							message: e
						})
					}
				})
			}
			showAsync() {
				return u(this, void 0, void 0, function* () {
					try {
						return yield this._curAd.showAd(), Promise.resolve()
					} catch (e) {
						return Promise.reject({
							code: `show ${this._curAdName} error`,
							message: e
						})
					}
				})
			}
			isReady() {
				return null != this._curAd
			}
		}
	};
	class wn extends Xr {
		constructor(e, t, s) {
			super(e), this._config = null, this._next = null, this._curSucTimes = 0, this._curAdName = "", this._config = t, this._next = s
		}
		loadAsync(s) {
			return u(this, void 0, void 0, function* () {
				try {
					var e, t;
					return this._curSucTimes < this._config.showTimes || -1 === this._config.showTimes ? void 0 === (e = vn[this._config.adsName]) ? (this._isFinish = !0, this._next && this._next(), console.info(`======> error: ${this._config.adsName} waterfall strategy not found, exec queue next`), Promise.reject({
						code: Z.ADS_NETWORK_NOT_FOUND,
						message: this._config.adsName + " waterfall strategy not found"
					})) : ((t = new e(this._config.placementId || s, this._isReward)).setAdsCallback({
						onShow: () => {
							console.log(`====> ${this._curAdName} show`)
						},
						onSuccess: () => {
							console.log(`====> ${this._curAdName} success`), this._curSucTimes++, this._curSucTimes === this._config.showTimes && (this._isFinish = !0, this._next) && this._next(), this._refreshTotalShowTimeCallback && this._refreshTotalShowTimeCallback()
						},
						onFail: () => {
							console.log(`====> ${this._curAdName} failed`)
						},
						onClick: () => {
							console.log(`====> ${this._curAdName} clicked`)
						},
						onClose: () => {
							console.log(`====> ${this._curAdName} closed`)
						}
					}), yield t.loadAsync(), this._adInstants.push(t), Promise.resolve()) : Promise.reject({
						code: "load waterFall ad error",
						message: "has reach showTimes"
					})
				} catch (e) {
					return Promise.reject({
						code: "load waterFall ad error",
						message: e.message
					})
				}
			})
		}
		showAsync() {
			return u(this, void 0, void 0, function* () {
				try {
					var e;
					return this._adInstants.length <= 0 ? Promise.reject({
						code: "show adInstant error",
						message: "there is no ad instant"
					}) : this._curSucTimes < this._config.showTimes || -1 === this._config.showTimes ? (e = this._adInstants.shift(), this._curAdName = e.getStrategyName(), yield (this._curAdInstant = e).showAsync(), Promise.resolve()) : void 0
				} catch (e) {
					return Promise.reject(e)
				}
			})
		}
		getCurAdName() {
			return this._curAdName = this._adInstants[0].getStrategyName(), this._curAdName
		}
		getLoadTimeInterval() {
			let e = 0;
			return this._config || (e = 0, console.info("adsWaterFall's config null")), e = this._config.timeInterval || 0
		}
	}
	class An extends Xr {
		constructor(e, t) {
			super(e), this.adsNames = [], this.curAdName = "", this.adsNames = this.adsNames.concat(t)
		}
		loadAsync(a) {
			return u(this, void 0, void 0, function* () {
				try {
					var e, t, s, r = vn,
						n = Math.floor(Math.random() * this.adsNames.length),
						i = r[this.adsNames[n]],
						o = {
							onShow: () => {
								console.log(`====> ${this.curAdName} show`)
							},
							onSuccess: () => {
								console.log(`====> ${this.curAdName} success`), this._refreshTotalShowTimeCallback && this._refreshTotalShowTimeCallback()
							},
							onFail: () => {
								console.log(`====> ${this.curAdName} failed`)
							},
							onClick: () => {
								console.log(`====> ${this.curAdName} clicked`)
							},
							onClose: () => {
								console.log(`====> ${this.curAdName} closed`)
							}
						};
					return this._adInstants.length <= 0 ? (e = new i(a, this._isReward), this._adInstants.push(e), e.setAdsCallback(o), yield e.loadAsync(), t = new i(a, this._isReward), this._adInstants.push(t), t.setAdsCallback(o), yield t.loadAsync()) : (s = new i(a, this._isReward), this._adInstants.push(s), s.setAdsCallback(o), yield s.loadAsync()), Promise.resolve()
				} catch (e) {
					return Promise.reject({
						code: "load keep bottom ad error",
						message: e.message
					})
				}
			})
		}
		showAsync() {
			try {
				var e = this._adInstants.shift();
				return this.curAdName = e.getStrategyName(), (this._curAdInstant = e).showAsync()
			} catch (e) {
				return Promise.reject({
					code: "Keep_Bottom_ad_show_error",
					message: e.message
				})
			}
		}
		getCurAdName() {
			return this.curAdName = this._adInstants[0].getStrategyName(), this.curAdName
		}
	}
	class _n extends Xr {
		constructor(e, t) {
			super(e), this.adsNames = [], this.adsNames = this.adsNames.concat(t)
		}
		loadAsync(i) {
			return u(this, void 0, void 0, function* () {
				if (0 === this.adsNames.length) return console.info("====> No Substitute Ads's config"), Promise.resolve();
				try {
					var t, s = {
						adsense: Zr,
						taboola: pn,
						android: cn,
						mda: an
					};
					const r = {
						AfgStrategy: "adsense",
						TaboolaStrategy: "taboola",
						AndroidStrategy: "android",
						MdaStrategy: "mda"
					};
					for (let e = 0; e < this.adsNames.length; e++) {
						const n = this.adsNames[e];
						this._adInstants.some((e, t, s) => {
							e = e.getStrategyName();
							return r[e] === n
						}) || (t = new s[n](i, this._isReward), this._adInstants.push(t), yield t.loadAsync())
					}
					return Promise.resolve()
				} catch (e) {
					return console.info("====> load substitute ad error: ", e.message), Promise.resolve()
				}
			})
		}
		showAsync(t) {
			if (0 === this.adsNames.length) return console.info("====> No Substitute Ads's config"), Promise.reject({
				code: "AdsSubstitute show error",
				message: "No Substitute Ads's config"
			});
			try {
				var e = this._adInstants.find(e => e.getStrategyName() !== t);
				if (!e) return Promise.reject({
					code: "AdsSubstitute show error",
					message: t + " is the same with substitute ad"
				});
				this._curAdInstant = e;
				var s = this._adInstants.indexOf(e);
				this._adInstants.splice(s, 1);
				const r = e.getStrategyName();
				return e.setAdsCallback({
					onShow: () => {
						console.log(`====> ${r} success`)
					},
					onSuccess: () => {
						console.log(`====> ${r} success`), this._refreshTotalShowTimeCallback && this._refreshTotalShowTimeCallback()
					},
					onFail: () => {
						console.log(`====> ${r} failed`)
					},
					onClick: () => {
						console.log(`====> ${r} clicked`)
					},
					onClose: () => {
						console.log(`====> ${r} closed`)
					}
				}), e.showAsync()
			} catch (e) {
				return Promise.reject(e)
			}
		}
	} (ot = B = B || {}).waterFall = "waterFall", ot.keepBottom = "keepBottom";
	class bn {
		constructor(e, t, s) {
			this.config = null, this.isReward = !1, this.lastShowTime = 0, this.enabled = !0, this.limitTime = 0, this.adsWaterFall = [], this.adsWaterFallQueue = [], this.adsKeepBottom = null, this.adsSubstitute = null, this.queue = null, this.adState = B.waterFall, this.curAds = null, this.curShowTimes = 0, this.placementID = "", this.isReward = e, this.config = t, this.enabled = !s && this.config.enabled, this.limitTime = this.config.limitTime, this.adsKeepBottom = new An(this.isReward, this.config.strategy.keepBottom), this.adsSubstitute = new _n(this.isReward, this.config.strategy.substitute), this.queue = new Jr, this.pushToQueue(), this.onComplete(), this.queue.play()
		}
		pushToQueue() {
			this.config.strategy.waterFall.forEach((r, e, t) => {
				this.queue.push((t, e, s) => u(this, void 0, void 0, function* () {
					var e = new wn(this.isReward, r, t);
					this.adsWaterFall.push(e), e.refreshTotalShowTimeCallback = () => {
						this.lastShowTime = h.getTimeBySecond(), this.curShowTimes++
					}
				}))
			})
		}
		onComplete() {
			this.queue.complete = () => u(this, void 0, void 0, function* () {
				this.adState = B.keepBottom, console.info("====> waterFall ads finish."), yield this.adsKeepBottom.loadAsync(this.placementID), console.info("====> preload keepBottom ads")
			})
		}
		loadAsync(s) {
			return u(this, void 0, void 0, function* () {
				if (0 === this.placementID.length && (this.placementID = s), !this.enabled) return Y(`load ${this.isReward ? "rewardAd" : "interstitialAd"} is disabled`), Promise.resolve();
				try {
					var e, t;
					return yield this.adsSubstitute.loadAsync(s), this.adState === B.waterFall ? (e = this.adsWaterFall.find(e => !1 === e.IsFinish), this.adsWaterFallQueue.push(e), t = (this.adsWaterFallQueue.length - 1) * e.getLoadTimeInterval(), yield h.waitTime(1e3 * t), yield e.loadAsync(s), Promise.resolve()) : this.adState === B.keepBottom ? this.adsKeepBottom.loadAsync(s) : Promise.reject({
						code: "Ads load  error",
						message: "ad state error"
					})
				} catch (e) {
					return e.code === Z.ADS_NETWORK_NOT_FOUND ? this.adState === B.waterFall ? this.adsWaterFall.find(e => !1 === e.IsFinish).loadAsync(s) : this.adState === B.keepBottom ? this.adsKeepBottom.loadAsync(s) : Promise.reject({
						code: "Ads load  error",
						message: "ad state error"
					}) : Promise.reject({
						code: this.adState + " load ad error",
						message: e.message
					})
				}
			})
		}
		showAsync() {
			return u(this, void 0, void 0, function* () {
				if (!this.enabled) return Y(`show ${this.isReward ? "rewardAd" : "interstitialAd"} is disabled`), Promise.resolve();
				if (this.curShowTimes >= this.config.totalTimes && -1 !== this.config.totalTimes) return Promise.reject({
					code: `show ${this.isReward ? "rewardAd" : "interstitialAd"} error`,
					message: "had reach the max show times"
				});
				var e, t = h.getTimeBySecond() - this.lastShowTime;
				if (t < this.limitTime) return Promise.reject({
					code: `show ${this.isReward ? "rewardAd" : "interstitialAd"} frequently`,
					message: this.limitTime - t + " seconds remain"
				});
				let s = "";
				try {
					return this.adState === B.waterFall ? (e = this.adsWaterFall.find(e => !1 === e.IsFinish), s = e.getCurAdName(), yield (this.curAds = e).showAsync(), Promise.resolve()) : this.adState === B.keepBottom ? (s = this.adsKeepBottom.getCurAdName(), this.curAds = this.adsKeepBottom, yield this.adsKeepBottom.showAsync(), this.lastShowTime = h.getTimeBySecond(), this.curShowTimes++, Promise.resolve()) : Promise.reject({
						code: "load ad error",
						message: "ad state error"
					})
				} catch (e) {
					if ("dismissed" === e.code) return Promise.reject({
						code: `show ${this.isReward ? "rewardAd" : "interstitialAd"} error`,
						message: e.message
					});
					this.curAds = this.adsSubstitute;
					try {
						return yield this.adsSubstitute.showAsync(s), this.curShowTimes++, Promise.resolve()
					} catch (e) {
						return Promise.reject(e)
					}
				}
			})
		}
		onShowAdsResult(e, t) {
			console.info(`====> ${this.isReward ? "rewardAd" : "interstitialAd"} show result: ${e}, this.curAds: ` + this.curAds), this.curAds ? this.curAds.onShowAdsResult(e, t) : console.error("adsController onShowAdsResult error: cur ads is null")
		}
	}
	class Sn { }
	class Pn extends Sn {
		constructor() {
			super(...arguments), this._showBannerResult = null, this._hideBannerResult = null
		}
		showBannerAsync(e) {
			return new Promise((t, s) => {
				window.AdInteractive ? (window.AdInteractive.showBannerAd(), this._showBannerResult = e => {
					e ? t() : s({
						code: "android show fail",
						message: "android show banner ads fail"
					})
				}) : s("Android AdInteractive not exist")
			})
		}
		hideBannerAsync() {
			return new Promise((t, s) => {
				window.AdInteractive ? (window.AdInteractive.hideBannerAd(), this._hideBannerResult = e => {
					e ? t() : s({
						code: "android hide fail",
						message: "android hide banner ads fail"
					})
				}) : s("Android AdInteractive not exist")
			})
		}
		onShowBannerResult(e) {
			this._showBannerResult ? this._showBannerResult(e) : console.error("android show banner result error")
		}
		onHideBannerResult(e) {
			this._hideBannerResult ? this._hideBannerResult(e) : console.error("android hide banner result error")
		}
	}
	class xn extends Sn {
		constructor() {
			super(...arguments), this._bannerElement = "minigameTaboolaBanner"
		}
		showBannerAsync(e) {
			try {
				var t = document.createElement("div"),
					s = (t.setAttribute("id", "minigameTaboolaBanner"), t.setAttribute("style", "font-size: 16px;font-family: Microsoft YaHei;font-weight: 400; position: fixed;bottom:0;  z-index: 19999; overflow: hidden; width: 100vw;height: 80px; background-color: black;display: flex;align-items: end;justify-content: center;"), document.body.append(t), {
						containerObj: {
							id: "taboola-below-article-thumbnails_stream",
							containerStr: "#" + this._bannerElement,
							ifInsertBefore: !1,
							propertysObj: {
								style: "width:320px;height:70px;overflow: hidden;background: #fff;"
							}
						},
						adProperties: {
							mode: "thumbnails-stream",
							container: "taboola-below-article-thumbnails_stream",
							placement: `Below Article Thumbnails_Stream_${window.channelName}.game.banner`
						}
					});
				return new un(s).showAd()
			} catch (e) {
				return Promise.reject({
					code: "show tabool banner error",
					message: e.message
				})
			}
		}
		hideBannerAsync() {
			var e = document.getElementById(this._bannerElement);
			return e && e.remove(), Promise.resolve()
		}
	}
	class Rn {
		constructor(e, t) {
			this.enabled = !0, this._config = null, this._curBannerAd = null, this.curShowTimes = 0, this._config = e, this.enabled = !t && this._config.enabled
		}
		showBannerAsync(t) {
			return u(this, void 0, void 0, function* () {
				if (!this.enabled) return Y("show banner is disabled"), Promise.resolve();
				if (this.curShowTimes >= this._config.totalTimes && -1 !== this._config.totalTimes) return Promise.reject({
					code: "show banner error",
					message: "banner show times is over"
				});
				try {
					var e = new {
						taboola: xn,
						android: Pn
					}[this._config.adsName];
					return yield (this._curBannerAd = e).showBannerAsync(t), this.curShowTimes++, Promise.resolve()
				} catch (e) {
					return Promise.reject(e)
				}
			})
		}
		hideBannerAsync() {
			return this.enabled ? this._curBannerAd.hideBannerAsync() : (Y("hide banner is disabled"), Promise.resolve())
		}
		onShowBannerResult(e, t) {
			var s;
			this._curBannerAd ? null != (s = this._curBannerAd) && s.onShowBannerResult(e, t) : console.error("ShowBanner Android Callback Error: cur bannnerAd is null")
		}
		onHideBannerResult(e, t) {
			var s;
			this._curBannerAd ? null != (s = this._curBannerAd) && s.onHideBannerResult(e, t) : console.error("HideBanner Android Callback Error: cur bannnerAd is null")
		}
	}
	class kn {
		constructor() {
			this._config = null
		}
		get config() {
			return this._config
		}
		static get instance() {
			return this._instance || (this._instance = new kn), this._instance
		}
		fetchConfigAsync(s) {
			return u(this, void 0, void 0, function* () {
				try {
					var e = s,
						t = yield fetch(e);
					return 404 === t.status ? Promise.reject({
						code: "No_Config_File",
						message: "there is no config file " + e
					}) : (this._config = yield t.json(), console.info("fetch MinigameAd config success: ", this._config), Promise.resolve())
				} catch (e) {
					return Promise.reject({
						code: "fetch MinigameAd fail",
						message: e.message
					})
				}
			})
		}
	}
	kn._instance = null;
	const In = kn.instance,
		Cn = {
			adType: {
				interstitial: {
					enabled: !0,
					limitTime: 30,
					totalTimes: -1,
					strategy: {
						waterFall: [{
							adsName: "adsense",
							showTimes: -1
						}],
						keepBottom: [],
						substitute: []
					}
				},
				reward: {
					enabled: !0,
					limitTime: 0,
					totalTimes: -1,
					strategy: {
						waterFall: [{
							adsName: "adsense",
							showTimes: -1
						}],
						keepBottom: ["adsense"],
						substitute: ["adsense"]
					}
				},
				banner: {
					enabled: !1,
					adsName: "taboola",
					totalTimes: 3
				}
			}
		},
		Tn = e => {
			var t, s;
			return e.enabled ? ({
				waterFall: e,
				keepBottom: t,
				substitute: s
			} = e.strategy, e = [...e.map(e => e.adsName), ...t, ...s], [...new Set([...e])]) : []
		};
	class Bn {
		constructor() {
			this.interstitialAdsController = null, this.rewardAdsController = null, this.bannerAdsController = null, this.config = null, this.disabledAd = !1
		}
		static get instance() {
			return this._instance || (this._instance = new Bn), this._instance
		}
		setConfig() {
			this.config = In.config || Cn
		}
		getConfig() {
			return this.config
		}
		getDisableAds() {
			return this.disabledAd
		}
		setDisableAds(e) {
			this.disabledAd = e || !1, this.disabledAd && Y("[minigame] ads disabled")
		}
		initScripts(s) {
			return u(this, void 0, void 0, function* () {
				var e, r, t = [...new Set([...Tn(this.config.adType.interstitial), ...Tn(this.config.adType.reward)].concat(this.config.adType.banner.enabled ? [this.config.adType.banner.adsName] : []))];
				e = t, r = s, yield u(void 0, void 0, void 0, function* () {
					const t = {
						adsense: Gr,
						adivery: Wr,
						admanager: zr,
						bridge: $r,
						packageAdmanager: zr
					},
						s = [];
					return e.forEach(e => {
						t[e] && s.push(t[e](r))
					}), Promise.all(s)
				})
			})
		}
		createAdInstants() {
			return u(this, void 0, void 0, function* () {
				this.rewardAdsController = new bn(!0, this.config.adType.reward, this.getDisableAds()), this.interstitialAdsController = new bn(!1, this.config.adType.interstitial, this.getDisableAds()), this.bannerAdsController = new Rn(this.config.adType.banner, this.getDisableAds())
			})
		}
		loadAsync(e, t) {
			return console.info("====> load AD placementId: ", e, "isReward: ", t), (t ? this.rewardAdsController : this.interstitialAdsController).loadAsync(e)
		}
		showAsync(e) {
			return console.info("====> show AD isReward: ", e), (e ? this.rewardAdsController : this.interstitialAdsController).showAsync()
		}
		loadBannerAsync(e) {
			return this.bannerAdsController.showBannerAsync(e)
		}
		hideBannerAsync() {
			return this.bannerAdsController.hideBannerAsync()
		}
		showPrerollAsync() {
			return d.isH5AndroidApp(), this.interstitialAdsController.showAsync()
		}
		onShowAdsResult(e, t, s) {
			console.info(`=====> androidCallJs onShowAdsResult isReward: ${e}, isSuccess: ${t}, message: ` + s), (e ? this.rewardAdsController : this.interstitialAdsController).onShowAdsResult(t, s)
		}
		onShowBannerResult(e, t) {
			console.info(`=====> androidCallJs onShowBannerResult isSuccess: ${e}, errMessage: ` + t), this.bannerAdsController.onShowBannerResult(e, t)
		}
		onHideBannerResult(e, t) {
			console.info(`=====> androidCallJs onHideBannerResult isSuccess: ${e}, errMessage: ` + t), this.bannerAdsController.onHideBannerResult(e, t)
		}
	}
	Bn._instance = null;
	const E = Bn.instance;
	window.showProllAsync = E.showPrerollAsync.bind(E), window.onShowAdsResult = E.onShowAdsResult.bind(E), window.onShowBannerResult = E.onShowBannerResult.bind(E), window.onHideBannerResult = E.onHideBannerResult.bind(E);
	const O = class ci {
		constructor() {
			this._ads = [], this._curAd = null, this._curBannerAd = null
		}
		get curAd() {
			return this._curAd
		}
		static get instance() {
			return this._instance || (this._instance = new ci), this._instance
		}
		loadAsync(t, s) {
			return u(this, void 0, void 0, function* () {
				try {
					var e = new cn(t, s);
					return this._ads.push(e), e.loadAsync()
				} catch (e) {
					return Promise.reject(e)
				}
			})
		}
		showAsync(t) {
			try {
				var e = this._ads.find(e => e.getRewardedType() === t);
				return this._curAd = e, console.info("====> showAsync: ad ing"), e.showAsync()
			} catch (e) {
				return console.info("====> showAsync error: ", e.message), Promise.reject(e)
			}
		}
		loadBannerAdAsync(e) {
			try {
				var t = new Pn;
				return (this._curBannerAd = t).showBannerAsync(e)
			} catch (e) {
				return Promise.reject(e)
			}
		}
		hideBannerAdAsync() {
			try {
				return this._curBannerAd.hideBannerAsync()
			} catch (e) {
				return Promise.reject(e)
			}
		}
		onShowBannerResult(e, t) {
			this._curBannerAd.onShowBannerResult(e)
		}
		onHideBannerResult(e, t) {
			this._curBannerAd.onHideBannerResult(e)
		}
		onShowAdsResult(e, t) {
			console.info(`====> onShowAdsResult: isSuccess = ${e}, errMessage = ` + t);
			try {
				this._curAd.onShowAdsResult(e, t)
			} catch (e) {
				console.info("====> onShowAdsResult error: ", e.message), console.error("====> onShowAdsResult error: ", e.message)
			}
		}
	}.instance;
	window.onShowAdsResult = O.onShowAdsResult.bind(O), window.onShowBannerResult = O.onShowBannerResult.bind(O), window.onHideBannerResult = O.onHideBannerResult.bind(O), E.onShowAdsResult = O.onShowAdsResult.bind(O), E.onShowBannerResult = O.onShowBannerResult.bind(O), E.onHideBannerResult = O.onHideBannerResult.bind(O);
	class N extends Or {
		constructor(e, t) {
			super(e), this._requestCounter = 0, this._pendingRequests = [], this._requestWindow = t
		}
		static createDefaultInstance(e) {
			return this._instance || (this._instance = new N(window, e)), this._instance
		}
		static get instance() {
			if (this._instance) return this._instance;
			throw {
				code: "NO_CLIENT_INSTANCE",
				message: "MediationClient is not initialized"
			}
		}
		dispatch(e, t) {
			const s = e;
			e = this._pendingRequests.find(e => e.responseType === s.type && e.requestId === s.requestId);
			e && (this._pendingRequests = this._pendingRequests.filter(e => !(e.responseType === s.type && e.requestId === s.requestId)), e.onResponse) && e.onResponse(s)
		}
		invokeServiceAsync(t, n = !1) {
			return new Promise((s, r) => {
				var e;
				t.requestId = ++this._requestCounter, n || (e = {
					responseType: t.responseType || Dr(t.type),
					requestType: t.type,
					requestId: t.requestId,
					onResponse: e => {
						var t;
						((t = e).code === i.OK || void 0 === t.code || null === t.code || "" === t.code ? s : r)(e)
					}
				}, this._pendingRequests.push(e)), Or.postMessageTo(this._requestWindow, t, "*")
			})
		}
		invokeQuickServiceAsync(e, t = !1, s) {
			return this.invokeServiceAsync({
				type: e,
				payload: s
			}, t)
		}
	}
	const Dn = "minigameTaboolaBanner";
	class En {
		constructor() {
			this._ads = []
		}
		static get instance() {
			return this._instance || (tn.setTest(!0), this._instance = new En), this._instance
		}
		loadAsync(e) {
			return this._ads.push(e), e.loadAsync()
		}
		showAsync(r) {
			return new Promise((t, s) => {
				for (let e = 0; e < this._ads.length; e++)
					if (this._ads[e].isReady() && r === this._ads[e].getRewardedType()) return void this._ads[e].showAsync().then(() => {
						t(), this._ads.splice(e, 1)
					}).catch(e => {
						s(e)
					});
				s("===>test ads not ready")
			})
		}
		showBannerAsync(e) {
			var t = document.createElement("div");
			return t.setAttribute("id", Dn), t.setAttribute("style", "font-size: 16px;font-family: Microsoft YaHei;font-weight: 400; position: fixed;bottom:0;left: 50%;transform: translate(-50%, 0);  z-index: 19999; overflow: hidden; width: 100vw;height: 80px; background-color: black;display: flex;align-items: center;justify-content: center;"), t.innerHTML = '<div><a href="https://minigame.vip/" target="_blank" style="height: 50px;background: #fff;width: 300px;display: block;line-height: 50px;text-align: center;">banner地址</a></div>', document.body.append(t), Promise.resolve()
		}
		hideBannerAsync() {
			var e = document.getElementById(Dn);
			return e && e.remove(), Promise.resolve()
		}
	}
	let On = En.instance;
	class Nn extends an {
		constructor() {
			super(...arguments), this._strategyName = "TestAdsStrategy"
		}
	}
	class jn extends R {
		static createRequest(e) {
			return {
				type: jn.requestType,
				payload: e
			}
		}
		static createService() {
			return new jn(jn.requestType, !1, jn.handleRequestAsync)
		}
		static handleRequestAsync(t) {
			var e = t.payload.placementId,
				s = t.payload.isRewardedAd;
			return t.payload.uid, E.loadAsync(e, s).then(() => (console.info("====>load Ads success"), Promise.resolve(k(t)))).catch(e => Promise.resolve(I(t, e.code, e.message)))
		}
	}
	jn.requestType = "AFGAdInstantLoadService";
	class Fn extends R {
		static createService() {
			return new Fn(Fn.requestType, !1, Fn.handleRequestAsync)
		}
		static createRequest(e) {
			return {
				type: Fn.requestType,
				payload: e
			}
		}
		static handleRequestAsync(s) {
			return u(this, void 0, void 0, function* () {
				var e = s.payload.isRewardedAd ? pr.reward : pr.next,
					t = s.payload.placementId;
				return s.payload.uid, console.info(`===> show ad: ${e}|` + t), E.showAsync(s.payload.isRewardedAd).then(() => (console.info("====>show ads: success"), Promise.resolve(k(s)))).catch(e => (console.info("====>showAdsStrategy show ads: failed: ", e), Promise.resolve(I(s, e.code, e.message))))
			})
		}
	}
	Fn.requestType = "AFGAdInstantShowService";
	class Mn {
		constructor(e) {
			this._isRewardedAd = !1, this._uid = "", this._placementId = e, this._isRewardedAd = !1, this._uid = (new Date).getTime().toString()
		}
		static create(e, t) {
			e = new Mn(e);
			return e.setRewardedType(t), e
		}
		setRewardedType(e) {
			this._isRewardedAd = e
		}
		getPlacementID() {
			return this._placementId
		}
		loadAsync() {
			if (window.MiniGameAds && !1 === window.MiniGameAds._enabled) return Promise.resolve();
			var e, t = {
				isRewardedAd: this._isRewardedAd,
				placementId: this._placementId,
				uid: this._uid
			};
			if (window.AdInteractive && window.MiniGameAds && window.MiniGameAds.isAndroidApp) try {
				return console.info(`====> Android invoke load ${this._isRewardedAd ? "reward" : "interstitial"} ad`), O.loadAsync(this._placementId, this._isRewardedAd)
			} catch (e) {
				return Promise.reject(e)
			}
			return window.MiniGameAds && window.MiniGameAds.isTest ? (e = new Nn(this._placementId, this._isRewardedAd), En.instance.loadAsync(e).then(() => (console.info("test ad load service return success"), Promise.resolve())).catch(e => (console.info("test ad load service return error: ", e), Promise.reject(e)))) : N.instance.invokeServiceAsync(jn.createRequest(t)).then(() => Promise.resolve()).catch(e => (console.info("Ad load service return error: ", e), Promise.reject(e)))
		}
		showAsync() {
			if (window.MiniGameAds && !1 === window.MiniGameAds._enabled) return Promise.resolve();
			var e = {
				isRewardedAd: this._isRewardedAd,
				placementId: this._placementId,
				uid: this._uid
			};
			if (window.AdInteractive && window.MiniGameAds && window.MiniGameAds.isAndroidApp) try {
				return console.info(`====> Android invoke show ${this._isRewardedAd ? "reward" : "interstitial"} ad`), O.showAsync(this._isRewardedAd)
			} catch (e) {
				return Promise.reject(e)
			}
			return window.MiniGameAds && window.MiniGameAds.isTest ? En.instance.showAsync(this._isRewardedAd).then(() => (console.info("test ad show service return success"), Promise.resolve())).catch(e => (console.info("test ad show service return error: ", e), Promise.reject(e))) : N.instance.invokeServiceAsync(Fn.createRequest(e)).then(() => Promise.resolve()).catch(e => (console.info("Ad show service return error: ", e), Promise.reject(e)))
		}
	}
	class qn {
		getID() {
			return "0"
		}
		getContextID() {
			return "0"
		}
		getEndTime() {
			return 0
		}
		getTitle() {
			return ""
		}
		getPayload() {
			return ""
		}
	}
	var Ln = new class {
		postScoreAsync(e) {
			return Promise.resolve()
		}
		createAsync(e) {
			return o.emptyWaitObject(new qn)
		}
		shareAsync(e) {
			return Promise.resolve()
		}
		joinAsync(e) {
			return Promise.resolve()
		}
		getTournamentsAsync() {
			return o.emptyWaitObject([])
		}
	};
	ht = "1.2.9 b009";
	let Un = !1;
	const Hn = {
		version: ht,
		init: function () {
			return u(this, void 0, void 0, function* () {
				if (Un) throw {
					code: "SDK_ALREADY_INIT",
					message: "Minigame Sdk has been initialized"
				};
				try {
					var e = yield Kr();
					console.info("[minigame] initSdkAsync options:", e);
					try {
						e.ga && !e.ga.disabled && (c = e.ga, window.dataLayer = window.dataLayer || [], window.gtag = window.gtag || l, (d = c.config.gid) ? (console.info("[minigame] init ga with id: " + d), oe("https://www.googletagmanager.com/gtag/js?id=" + d, !0, c.attributes).then(() => { }).catch(e => {
							console.error("[minigame] init ga error: ", e)
						}), l("js", new Date), l("config", d, {
							cookie_flags: "max-age=7200;secure;samesite=none"
						})) : console.warn("[minigame] ga with invalid id: " + d))
					} catch (e) {
						console.error("[minigame] initGa error:", e)
					}
					try {
						var t = e.instana;
						t && t.enabled && t.key && (s = t.key, r = e.app_id, s && 0 !== s.length ? (console.info("enable instana for game: ", r), n = window, o = "ineum", n[i = "InstanaEumObject"] || (n[i] = o, (a = n[o] = function () {
							a.q.push(arguments)
						}).q = [], a.v = 2, a.l = +new Date), window.ineum("reportingUrl", "https://eum-orange-saas.instana.io"), window.ineum("key", s), window.ineum("trackSessions"), oe("https://eum.instana.io/eum.min.js", !1, {
							crossorigin: "anonymous",
							defer: !0
						}), r && window.ineum("page", "minigame#" + r)) : console.warn("[minigame] init instana with invalid token: ", s))
					} catch (e) { }
					try {
						e.vconsole && ! function () {
							u(this, void 0, void 0, function* () {
								window.VConsole ? console.info("[minigame] vconsole already loaded") : yield oe("https://unpkg.com/vconsole/dist/vconsole.min.js", !1), window.vConsoleInstance = new window.VConsole
							})
						}()
					} catch (e) {
						console.error("[minigame] initVConsole error:", e)
					}
					Un = !0
				} catch (e) {
					console.error("Fail to load config file", e)
				}
				var s, r, n, i, o, a, c, d;

				function l() {
					window.dataLayer.push(arguments)
				}
			})
		},
		isReady: () => Un
	},
		zn = (console.info("minigame sdk: " + ht), {
			PROGRESS: "MINIGAME_PROGRESS",
			INIT: "MINIGAME_INIT",
			START_GAME: "MINIGAME_START_GAME"
		});
	class Wn extends R {
		static createRequest(e) {
			return {
				type: Wn.requestType,
				payload: e
			}
		}
		static createService() {
			return new Wn(Wn.requestType, !1, Wn.handleRequestAsync)
		}
		static handleRequestAsync(t) {
			return E.loadBannerAsync(t.payload).then(() => Promise.resolve(k(t))).catch(e => Promise.reject(I(t, e.code, e.message)))
		}
	}
	Wn.requestType = "BannerShowService";
	class $n extends R {
		static createRequest() {
			return {
				type: $n.requestType
			}
		}
		static createService() {
			return new $n($n.requestType, !1, $n.handleRequestAsync)
		}
		static handleRequestAsync(t) {
			return E.hideBannerAsync().then(() => Promise.resolve(k(t))).catch(e => Promise.reject(I(t, e.code, e.message)))
		}
	}
	$n.requestType = "BannerHideService";
	class Gn {
		getChannelID() {
			return ""
		}
		getInstanceID() {
			return ""
		}
		getStateAsync() {
			return o.emptyWaitObject({
				show: !1,
				docked_location: "TOP_LEFT"
			})
		}
		getDisplayRectAsync() {
			return o.emptyWaitObject({
				x: 0,
				y: 0,
				width: 0,
				height: 0
			})
		}
		setState(e) { }
		destroy() { }
	}
	const Kn = class di {
		constructor() {
			this._shareResult = null
		}
		static get instance() {
			return this._instance || (this._instance = new di), this._instance
		}
		shareAsync(t) {
			return new Promise((s, r) => {
				var e;
				window.AdInteractive ? (console.info("====> AdInteractive.share : ", t), window.AdInteractive.share(t.image, null == (e = t.media) ? void 0 : e.gif.url, null == (e = t.media) ? void 0 : e.video.url), this._shareResult = (e, t) => {
					console.info("====> onShareResult isSuccess: " + e), e ? s() : r({
						code: "android share fail",
						message: t
					})
				}) : (console.info("====> android share fail by no AdInteractive"), r({
					code: "android share fail",
					message: "android share fail by no AdInteractive"
				}))
			})
		}
		onShareResult(e, t) {
			this._shareResult ? this._shareResult(e, t) : console.error(`onShareResult === isSuccess : ${e}, errMessage : ` + t)
		}
	}.instance;
	window.onShareResult = Kn.onShareResult.bind(Kn);
	class Vn {
		constructor() {
			this._products = [], this._purchasesUnconsumed = []
		}
		static getInstance() {
			return null == this._instance && (this._instance = new Vn), this._instance
		}
		addProduct(t, s) {
			return u(this, void 0, void 0, function* () {
				var e = {},
					e = (e.productID = t, e.price = s || "", e.priceCurrencyCode = "USD", e.title = "", e.description = "", e.imageURI = "", this._products.push(e), {});
				e.products = this._products, yield x.setDataAsync(e), console.info("====> addProduct success, products : " + JSON.stringify(this._products))
			})
		}
		getCatalogAsync() {
			return u(this, void 0, void 0, function* () {
				try {
					var e = yield x.getDataAsync(["products"]);
					return this._products = [], e.products && 0 < e.products.length && (this._products = this._products.concat(e.products)), console.info("====> test getCatalogAsync success, products : " + JSON.stringify(this._products)), o.emptyWaitObject(this._products)
				} catch (e) {
					return console.error("====> test getCatalogAsync fail : " + e), Promise.reject(e)
				}
			})
		}
		purchaseAsync(r) {
			return u(this, void 0, void 0, function* () {
				try {
					const s = r.productID;
					this._products.find(e => e.productID === s);
					var e = {},
						t = (e.productID = s, e.paymentID = "", e.purchaseToken = h.getTimestamp().toString(), e.purchaseTime = h.getTimestamp().toString(), e.signedRequest = "", e.developerPayload = r.developerPayload, yield this.getPurchasesAsync(), this._purchasesUnconsumed.push(e), {});
					return t.purchasesUnconsumed = this._purchasesUnconsumed, yield x.setDataAsync(t), console.info("====> purchaseAsync success, purchasesUnconsumed : " + JSON.stringify(this._purchasesUnconsumed)), Promise.resolve(e)
				} catch (e) {
					return console.error("====> purchaseAsync fail : " + e), Promise.reject(e)
				}
			})
		}
		getPurchasesAsync() {
			return this.getPurchasesUnconsumed()
		}
		consumePurchaseAsync(s) {
			return u(this, void 0, void 0, function* () {
				try {
					var e = this._purchasesUnconsumed.findIndex(e => e.purchaseToken === s),
						t = (this._purchasesUnconsumed.splice(e, 1)[0], {});
					return t.purchasesUnconsumed = this._purchasesUnconsumed, yield x.setDataAsync(t), console.info("====> consumePurchaseAsync success, purchasesUnconsumed : " + JSON.stringify(this._purchasesUnconsumed)), Promise.resolve()
				} catch (e) {
					return console.error("====> consumePurchaseAsync fail : " + e), Promise.reject(e)
				}
			})
		}
		onReady(e) {
			e && e()
		}
		getPurchasesUnconsumed() {
			return u(this, void 0, void 0, function* () {
				try {
					var e = yield x.getDataAsync(["purchasesUnconsumed"]);
					return e.purchasesUnconsumed && 0 < e.purchasesUnconsumed.length && (this._purchasesUnconsumed = [], this._purchasesUnconsumed = this._purchasesUnconsumed.concat(e.purchasesUnconsumed)), console.info("====> test getPurchasesUnconsumed success, purchasesUnconsumed : " + JSON.stringify(this._purchasesUnconsumed)), o.emptyWaitObject(this._purchasesUnconsumed)
				} catch (e) {
					return console.error("====> test getPurchasesUnconsumed fail : " + e), Promise.reject(e)
				}
			})
		}
	}
	Vn._instance = null;
	const Yn = Vn.getInstance();
	class Jn extends R {
		static createRequest(e) {
			return {
				type: Jn.requestType,
				payload: e
			}
		}
		static createService() {
			return new Jn(Jn.requestType, !1, Jn.handleRequestAsync)
		}
		static handleRequestAsync(t) {
			return Kn.shareAsync(t.payload).then(() => Promise.resolve(k(t))).catch(e => Promise.resolve(I(t, e.code, e.message)))
		}
	}
	Jn.requestType = "ShareService";
	class Xn {
		static get instance() {
			return null == this._instance && (this._instance = new Xn), this._instance
		}
		getCatalogAsync() {
			return console.info("===========> getCatalogAsync"), N.instance.invokeServiceAsync(Mr.createRequest()).then(e => (console.info("===========> getCatalogAsync success"), Promise.resolve(e.payload))).catch(e => (console.error("===========> getCatalogAsync fail " + e.message), Promise.reject({
				code: "getCatalogAsync fail",
				message: e.message
			})))
		}
		purchaseAsync(t) {
			return console.info("===========> purchaseAsync"), N.instance.invokeServiceAsync(qr.createRequest(t)).then(e => (console.info(`===========> purchaseAsync ${t.productID} success`), console.info("===========> purchaseAsync payload: " + JSON.stringify(e.payload)), Promise.resolve(e.payload))).catch(e => (console.error(`===========> purchaseAsync ${t.productID} ` + e.message), Promise.reject({
				code: "purchaseAsync fail",
				message: e.message
			})))
		}
		getPurchasesAsync() {
			return console.info("===========> getPurchasesAsync"), N.instance.invokeServiceAsync(Lr.createRequest()).then(e => (console.info("===========> getPurchasesAsync success"), Promise.resolve(e.payload))).catch(e => (console.error("===========> getPurchasesAsync " + e.message), Promise.reject({
				code: "getPurchasesAsync fail",
				message: e.message
			})))
		}
		consumePurchaseAsync(t) {
			return console.info("===========> consumePurchaseAsync"), N.instance.invokeServiceAsync(Ur.createRequest(t)).then(e => (console.info(`===========> consumePurchaseAsync ${t} success`), Promise.resolve())).catch(e => (console.error(`===========> consumePurchaseAsync ${t} ` + e.message), Promise.reject({
				code: "consumePurchaseAsync fail",
				message: e.message
			})))
		}
		onReady(e) {
			return u(this, void 0, void 0, function* () {
				console.info("===========> onReady"), yield N.instance.invokeServiceAsync(Hr.createRequest(e)).then(() => {
					console.info("===========> onReady success")
				}).catch(e => {
					console.error("===========> onReady fail " + e.message)
				})
			})
		}
	}
	Xn._instance = null;
	const Qn = Xn.instance;
	let Zn, ei, ti;
	var si = Object.freeze({
		__proto__: null,
		get player() {
			return Zn
		},
		get context() {
			return ei
		},
		get payments() {
			return ti
		},
		getLocale: function () {
			return navigator.language
		},
		getPlatform: function () {
			var e;
			return (K = void 0 === K ? (e = navigator.userAgent || navigator.vendor || window.opera, !(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) && !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4)))) : K) ? "MOBILE_WEB" : "WEB"
		},
		getSDKVersion: function () {
			return "7.0"
		},
		initializeAsync: function (e) {
			return u(this, void 0, void 0, function* () {
				try {
					N.instance.invokeQuickServiceAsync(zn.INIT, !0), yield hr(() => Hn.isReady()), Zn = ur.currentPlayer, ei = U.currentContext
				} catch (e) {
					console.error("initializeAsync error:", e)
				}
				return o.emptyWait()
			})
		},
		setLoadingProgress: function (e) {
			"number" != typeof e && (e = parseFloat(e)), e = isNaN(e) ? 0 : e, e = Math.min(100, e), e = Math.max(0, e), N.instance && N.instance.invokeQuickServiceAsync(zn.PROGRESS, !0, {
				progress: e
			})
		},
		getSupportedAPIs: function () {
			return ["getLocale", "getPlatform", "getSDKVersion", "getSupportedAPIs", "getEntryPointData", "logEvent", "onPause", "inventory.unlockItemAsync", "matchPlayerAsync", "initializeAsync", "setLoadingProgress", "setSessionData", "startGameAsync", "player.getID", "player.getName", "player.getPhoto", "player.flushDataAsync", "player.getDataAsync", "player.setDataAsync", "player.subscribeBotAsync", "player.getConnectedPlayersAsync", "player.getSignedPlayerInfoAsync", "player.canSubscribeBotAsync", "player.getStatsAsync", "player.setStatsAsync", "player.incrementStatsAsync", "context.getID", "context.getType", "context.isSizeBetween", "context.switchAsync", "context.chooseAsync", "context.createAsync", "context.getPlayersAsync", "payments.getCatalogAsync", "payments.purchaseAsync", "payments.getPurchasesAsync", "payments.consumePurchaseAsync", "payments.onReady", "getInterstitialAdAsync", "getRewardedVideoAsync", "loadBannerAdAsync", "hideBannerAdAsync", "shareAsync", "switchGameAsync", "quit", "canCreateShortcutAsync", "createShortcutAsync", "getEntryPointAsync", "getLeaderboardAsync", "checkCanPlayerMatchAsync", "postSessionScore", "updateAsync"]
		},
		getEntryPointData: function () {
			return {}
		},
		getEntryPointAsync: function () {
			return o.emptyWaitString("UNKNOWN")
		},
		setSessionData: function (e) { },
		startGameAsync: function () {
			return N.instance.invokeQuickServiceAsync(zn.START_GAME, !0), ti = window.MiniGameAds && window.MiniGameAds.isTest ? (console.info("====> MiniGameAds is test mode"), Yn) : (console.info("====> MiniGameAds is normal mode"), Qn), o.emptyWait()
		},
		shareAsync: function (t) {
			return window.AdInteractive && window.MiniGameAds && window.MiniGameAds.isAndroidApp ? Kn.shareAsync(t) : N.instance.invokeServiceAsync(Jn.createRequest(t)).then(() => Promise.resolve()).catch(e => (console.info(`shareAsync ${t} error: `, e), Promise.reject(e)))
		},
		updateAsync: function (e) {
			return o.emptyWait()
		},
		switchGameAsync: function (e, t) {
			return o.emptyWait()
		},
		canCreateShortcutAsync: function () {
			return o.emptyWaitBool(!1)
		},
		createShortcutAsync: function () {
			return o.emptyWait()
		},
		quit: function () { },
		logEvent: function (r, e, n) {
			if (void 0 === window.gaEvent) console.warn("===> gaEvent not init");
			else {
				console.info("logging event: ", r, n);
				let e, t, s;
				n && (e = n.category, t = n.label, s = n.nonInteraction);
				n = window.gtag;
				n && n("event", r, {
					event_category: e,
					event_label: t,
					non_interaction: s || !0
				})
			}
			return {}
		},
		onPause: function (e) { },
		getInterstitialAdAsync: function (e) {
			return o.emptyWaitObject(Mn.create(e, !1))
		},
		getRewardedInterstitialAsync: function (e) {
			return o.emptyWaitObject(Mn.create(e, !1))
		},
		getRewardedVideoAsync: function (e) {
			return o.emptyWaitObject(Mn.create(e, !0))
		},
		matchPlayerAsync: function (e, t, s) {
			return o.emptyWait()
		},
		checkCanPlayerMatchAsync: function () {
			return o.emptyWaitBool(!1)
		},
		getLeaderboardAsync: function (e) {
			return o.emptyWaitUnsupportApi("FBInstant.getLeaderboardAsync")
		},
		postSessionScore: function (e) { },
		bCustomInit: !0,
		loadBannerAdAsync: function (t) {
			if (window.MiniGameAds && !1 === window.MiniGameAds._enabled) return Promise.resolve();
			if (window.AdInteractive && window.MiniGameAds && window.MiniGameAds.isAndroidApp) try {
				return console.info("====> Android invoke loadBannerAdAsync"), O.loadBannerAdAsync(t)
			} catch (e) {
				return console.info("====> Android invoke loadBannerAdAsync error: ", e.messgae), Promise.reject(e)
			}
			return window.MiniGameAds && window.MiniGameAds.isTest ? On.showBannerAsync(t) : N.instance.invokeServiceAsync(Wn.createRequest(t)).then(() => Promise.resolve()).catch(e => (console.info(`banner ${t} show error: `, e), Promise.reject(e)))
		},
		hideBannerAdAsync: function () {
			if (window.MiniGameAds && !1 === window.MiniGameAds._enabled) return Promise.resolve();
			if (window.AdInteractive && window.MiniGameAds && window.MiniGameAds.isAndroidApp) try {
				return console.info("====> Android invoke hideBannerAdAsync"), O.hideBannerAdAsync()
			} catch (e) {
				return console.info("====> Android invoke hideBannerAdAsync error: ", e.messgae), Promise.reject(e)
			}
			return window.MiniGameAds && window.MiniGameAds.isTest ? On.hideBannerAsync() : N.instance.invokeServiceAsync($n.createRequest()).then(() => Promise.resolve()).catch(e => (console.info("banner hide error: ", e), Promise.reject(e)))
		},
		tournament: Ln,
		getTournamentAsync: function () {
			return o.emptyWaitObject(new qn)
		},
		canSwitchNativeGameAsync: function () {
			return o.emptyWaitBool(!1)
		},
		postSessionScoreAsync: function (e) { },
		inviteAsync: function () {
			return o.emptyWaitUnsupportApi("FBInstant.inviteAsync")
		},
		graphApi: class {
			static requestAsync(e, t, s) {
				return o.emptyWaitUnsupportApi("FBInstant.graphApi.requestAsync")
			}
		},
		arenas: class {
			static getArenasAsync() {
				return o.emptyWaitObject([])
			}
		},
		squads: class {
			static getAsync(e) {
				return o.emptyWaitObject(null)
			}
			static createAsync(e) {
				return o.emptyWaitObject(null)
			}
			static getPlayerSquadsAsync() {
				return o.emptyWaitObject([])
			}
			static canUseSquadsAsync() {
				return o.emptyWaitObject(!1)
			}
		},
		community: class {
			static canGetLiveStreamsAsync() {
				return o.emptyWaitObject(!1)
			}
			static canFollowOfficialPageAsync() {
				return o.emptyWaitObject(!1)
			}
			static canJoinOfficialGroupAsync() {
				return o.emptyWaitObject(!1)
			}
			static getLiveStreamsAsync(e) {
				return o.emptyWaitObject([])
			}
			static liveStreamsOverlayAsync() {
				return o.emptyWait()
			}
			static followOfficialPageAsync() {
				return o.emptyWait()
			}
			static joinOfficialGroupAsync() {
				return o.emptyWait()
			}
		},
		videoPlayer: class {
			static createAsync(e, t) {
				return o.emptyWaitObject(null)
			}
			static getInstancesAsync() {
				return o.emptyWaitObject([])
			}
		},
		room: class {
			static showAsync() {
				return o.emptyWait()
			}
			static getCurrentMatchAsync() {
				return o.emptyWaitObject(null)
			}
			static loadCameraEffectAsync(e) {
				return o.emptyWaitObject(null)
			}
			static clearCameraEffectAsync() {
				return o.emptyWait()
			}
		},
		liveVideoCommentView: class {
			static createAsync(e) {
				return o.emptyWaitObject(new Gn)
			}
		},
		inventory: class {
			static unlockItemAsync(e) {
				return o.emptyWaitUnsupportApi("FBInstant.inventory.unlockItemAsync")
			}
		}
	});
	N.createDefaultInstance(window.parent), N.instance.start(), window.FBInstant = si, window.minigame_sdk = Hn, window.mediationClient = N.instance, Hn.init()
});
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("next/router"));
const nprogress_1 = __importDefault(require("nprogress"));
nprogress_1.default.configure({ showSpinner: false });
let timer;
let state;
let activeRequests = 0;
const delay = 250;
function load() {
    if (state === "loading") {
        return;
    }
    state = "loading";
    timer = setTimeout(function () {
        nprogress_1.default.start();
    }, delay);
}
function stop() {
    if (activeRequests > 0) {
        return;
    }
    state = "stop";
    clearTimeout(timer);
    nprogress_1.default.done();
}
router_1.default.events.on("routeChangeStart", load);
router_1.default.events.on("routeChangeComplete", stop);
router_1.default.events.on("routeChangeError", stop);
const originalFetch = window.fetch;
window.fetch = async function (...args) {
    if (activeRequests === 0) {
        load();
    }
    activeRequests++;
    try {
        const response = await originalFetch(...args);
        return response;
    }
    catch (error) {
        return Promise.reject(error);
    }
    finally {
        activeRequests -= 1;
        if (activeRequests === 0) {
            stop();
        }
    }
};
function default_1() {
    return null;
}
exports.default = default_1;
//# sourceMappingURL=index.js.map
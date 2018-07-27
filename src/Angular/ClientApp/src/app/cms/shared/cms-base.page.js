"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var CmsBasePage = /** @class */ (function () {
    function CmsBasePage(cmsService) {
        this.cmsService = cmsService;
        this.ngUnsubscribe = new rxjs_1.Subject();
        this.isLoading = true;
    }
    CmsBasePage.prototype.ngOnInit = function () {
        var _this = this;
        this.cmsService.loadingChanged
            .pipe(operators_1.takeUntil(this.ngUnsubscribe))
            .subscribe(function (value) {
            _this.isLoading = value;
        });
        this.cmsService.modelChanged
            .pipe(operators_1.takeUntil(this.ngUnsubscribe))
            .subscribe(function (value) {
            _this.model = value;
        });
        this.cmsService.sitemapChanged
            .pipe(operators_1.takeUntil(this.ngUnsubscribe))
            .subscribe(function (value) {
            _this.sitemap = value;
        });
    };
    CmsBasePage.prototype.ngOnDestroy = function () {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    };
    return CmsBasePage;
}());
exports.CmsBasePage = CmsBasePage;
//# sourceMappingURL=cms-base.page.js.map
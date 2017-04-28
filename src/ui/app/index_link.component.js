"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var IndexLinkComponent = (function () {
    function IndexLinkComponent(eref) {
        this.name = '?name?';
        this.name = eref.nativeElement.getAttribute("name") || "NONAME";
    }
    return IndexLinkComponent;
}());
IndexLinkComponent = __decorate([
    core_1.Component({
        selector: 'index-link',
        template: "<!--bq-->\n    <div>\n        <h1>RestBundle  index-{{name}}.html</h1>\n        This the RestBundle home page for the /REST_BUNDLE REST service.\n        <ul>\n            <li><a href=\"index-jit.html\">index-jit.html</a> uses JIT (runtime) compiled Angular components \n            <li><a href=\"index-aot.html\">index-aot.html</a> uses AOT pre-compiled Angular components \n            <li><a href=\"index-dist.html\">index-dist.html</a> uses WebPack-ed AOT compiled Angular components\n        </ul>\n    </div>\n    <!--bq-->",
        styleUrls: ['./rest_bundle.module.css'],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IndexLinkComponent);
exports.IndexLinkComponent = IndexLinkComponent;
//# sourceMappingURL=index_link.component.js.map
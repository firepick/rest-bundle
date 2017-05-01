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
        this.service = '?service?';
        this.index = '?index?';
        this.index = eref.nativeElement.getAttribute("index") || "expected attribute:index";
        this.service = eref.nativeElement.getAttribute("service") || "expected attribute:service";
    }
    return IndexLinkComponent;
}());
IndexLinkComponent = __decorate([
    core_1.Component({
        selector: 'index-link',
        template: "<!--bq-->\n    <div>\n        <h1>RestBundle  index-{{index}}.html</h1>\n        This is the RestBundle home page for the /{{service}} REST service.\n        <ul>\n            <li><a href=\"index-jit\">/{{service}}/ui/index-jit</a> uses JIT (runtime) compiled Angular components \n            <li><a href=\"index-aot\">/{{service}}/ui/index-aot</a> uses AOT pre-compiled Angular components \n            <li><a href=\"index-dist\">/{{service}}/ui/index-dist</a> uses WebPack-ed AOT pre-compiled Angular components\n        </ul>\n        Each RestBundle provides a REST service along with one or more Angular user interface components.\n        Here we show the &lt;rest-bundle-ui&gt; Angular component which displays the information returned\n        by the /identity REST GET method of the /{{service}} service.\n    </div>\n    <!--bq-->",
        styleUrls: ['./rest-bundle.module.css'],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IndexLinkComponent);
exports.IndexLinkComponent = IndexLinkComponent;
//# sourceMappingURL=index-link.component.js.map
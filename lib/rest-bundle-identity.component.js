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
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
let RestBundleIdentityComponent = RestBundleIdentityComponent_1 = class RestBundleIdentityComponent {
    constructor(eref, http) {
        this.http = http;
        this.description = "";
        this.inst = ++RestBundleIdentityComponent_1.rbicInst;
        this.name = 'rest-bundle-identity';
        this.date = new Date();
        this.package = "(package unknown)";
        this.version = "(version unknown)";
        this.service = eref.nativeElement.getAttribute("service");
        this.description = eref.nativeElement.getAttribute("description") || this.description;
        setInterval(() => (this.date = new Date()), 1000);
    }
    ngAfterViewInit() {
        console.log("ngAfterViewInit", this.inst, this.service);
        var that = this;
        this.service && this.http.get("/" + that.service + "/identity")
            .toPromise()
            .then((res) => {
            var json = res.json();
            that.package = json.package || that.package;
            that.version = json.version || that.version;
        })
            .catch((err) => console.log("err", err));
    }
};
RestBundleIdentityComponent.rbicInst = 0;
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RestBundleIdentityComponent.prototype, "service", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RestBundleIdentityComponent.prototype, "description", void 0);
RestBundleIdentityComponent = RestBundleIdentityComponent_1 = __decorate([
    core_1.Component({
        selector: 'rest-bundle-identity',
        template: `
        <div class="rb-root">
            <table>
                <caption>&lt;{{name}}&gt; #{{inst}}</caption>
                <tr><th>Description:</th><td>{{description}}</td></tr>
                <tr><th>REST Service:</th><td>/{{service}}/identity</td></tr>
                <tr><th>Package:</th><td>{{package}}</td></tr>
                <tr><th>Version:</th><td>{{version}}</td></tr>
                <tr><th>Date:</th><td>{{date}}</td></tr>
            </table>
        </div>
        `,
        styles: [`
        .rb-root {
            padding: 5pt;
            border-radius: 5px;
            border: 1pt solid #555;
            background-color: #eee;
            font-family: Verdata,sans-serif;
        }
        th {
            text-align: left;
        }
        caption {
            font-weight: 700;
            font-size: 110%;
            color: #339;
            text-align: left;
        }
    `],
        providers: [],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, http_1.Http])
], RestBundleIdentityComponent);
exports.RestBundleIdentityComponent = RestBundleIdentityComponent;
var RestBundleIdentityComponent_1;
//# sourceMappingURL=rest-bundle-identity.component.js.map
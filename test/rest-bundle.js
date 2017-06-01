const supertest = require("supertest");

(typeof describe === 'function') && describe("RestBundle", function() {
    const should = require("should");
    const winston = require("winston");
    const pkg = require("../package.json");
    winston.level = "warn";

    it("GET /state generates HTTP200 response", function(done) {
        var app = require("../scripts/server.js");
        supertest(app).get("/test/state").expect((res) => {
            res.statusCode.should.equal(200);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
            var now = Date.now();
            Math.abs(now - res.body.now).should.below(100);
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("GET /identity generates HTTP200 response", function(done) {
        var app = require("../scripts/server.js");
        supertest(app).get("/test/identity").expect((res) => {
            res.statusCode.should.equal(200);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
            res.body.should.properties({
                name: "test",
                package: pkg.name,
            });
            res.body.version.should.match(/\d+.\d+.\d+/);
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("POST /echo generatesHTTP200 response", function(done) {
        var app = require("../scripts/server.js");
        supertest(app).post("/test/echo").send({greeting:"smile"}).expect((res) => {
            res.statusCode.should.equal(200);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
            should.deepEqual(res.body, {
                 greeting: "smile",
            });
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("POST generates HTTP500 response for thrown exception", function(done) {
        var app = require("../scripts/server.js");
        supertest(app).post("/test/identity").send({greeting:"whoa"}).expect((res) => {
            res.statusCode.should.equal(500);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
            res.body.should.properties(["error"]);
            res.body.error.should.match(/POST not supported/);
            res.body.error.should.match(/{"greeting":"whoa"}/);
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("GET /ui redirects to service HTML", function(done) {
        var app = require("../scripts/server.js");

        supertest(app).get("/test/ui").expect((res) => {
            res.statusCode.should.equal(302); // redirect
            res.headers["content-type"].should.match(/text/);
            res.headers["content-type"].should.match(/utf-8/);
            res.headers["location"].should.equal("/test/ui/index-service");
            done();
        }).end((err,res) => {if (err) throw err; });
    })
    it("GET /ui/index-service returns service HTML", function(done) {
        var app = require("../scripts/server.js");

        supertest(app).get("/test/ui/index-service").expect((res) => {
            res.statusCode.should.equal(200); 
            res.headers["content-type"].should.match(/text\/html/);
            res.text.should.match(/<title>test<\/title>/);
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("toKebabCase(id) does that", function() {
        var kebab = (id) => id.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/,'');
        kebab("XFooBar").should.equal("x-foo-bar");
        kebab("xFooBar").should.equal("x-foo-bar");
        kebab("abc").should.equal("abc");
        kebab("aBC").should.equal("a-b-c");
    });
})

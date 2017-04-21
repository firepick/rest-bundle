const HelloRest = require("../src/hello-rest");
const RestBundle = require("../src/rest-bundle");
const ResourceMethod = require("../src/resource-method");
const MockExpress = require("../src/mock-express");

(typeof describe === 'function') && describe("RestBundle", function() {
    var should = require("should");

    it("bindExpress() binds resource bundle paths to express resource handlers", function() {
        var app = new MockExpress();
        var simple = new HelloRest("simple"); // create a resource bundle with root path
        simple.bindExpress(app);
        var assertHandler = (method, path) => {
            method === "get" && app.testGET.should.properties([path]);
            method === "post" && app.testPOST.should.properties([path]);
        }
        assertHandler("get", "/simple/hello");
        assertHandler("post", "/simple/hello");
    })
    it("RestBundle generates HTTP200 response", function(done) {
        var app = new MockExpress();
        var simple = new HelloRest("simple"); // create a resource bundle with root path
        simple.bindExpress(app);
        app.mockHttp("get", "/simple/hello", (res) => {
            res.should.properties({
                statusCode: 200,
                type: "text/html",
                data: "hello",
            });
            app.count_next.should.equal(1);
            done();
        });
        return;
    })
    it("RestBundle generates HTTP500 response", function(done) {
        var app = new MockExpress();
        var simple = new HelloRest("simple"); // create a resource bundle with root path
        simple.bindExpress(app);
        app.mockHttp("post", "/simple/hello", (res) => {
            res.should.properties({
                statusCode: 500,
                type: "application/json",
                data: {
                    error: "goodbye"
                }
            });
            app.count_next.should.equal(1);
            done();
        });
    })
})
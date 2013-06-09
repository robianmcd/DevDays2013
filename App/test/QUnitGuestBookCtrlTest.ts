/// <reference path="./testDefs.ts" />
/// <reference path="../Scripts/typings/qunit/qunit.d.ts" />

class GuestBookCtrlTestScope {
    public guestBookCtrl: GuestBookCtrl = null;

    constructor(public userSessionService: UserSessionService,
                public $httpBackend: ng.IHttpBackendService,
                public $http: ng.IHttpService,
                public $log: ng.ILogService) {

    }

    public createGuestbookCtrl() {
        this.guestBookCtrl = new GuestBookCtrl(this.userSessionService, this.$http, this.$log);
    }

    public defaultEntries: Data.GuestbookEntry[] = [new Data.GuestbookEntry("Rob", "Sample message."),
                                                    new Data.GuestbookEntry("Someone", "Another message.")];

    public setupDefaultResponseToGetEntries() {
        //this.$httpBackend.whenGET("/api/entries").respond(this.defaultEntries);
    }
}

var injector = angular.injector(["ng", "GuestBookApp"]); //ngMock??
var testScope: GuestBookCtrlTestScope;

QUnit.module("QUnit GuestBookCtrl:", {
    setup: () => {
        testScope = new GuestBookCtrlTestScope(injector.get("UserSessionService"),
                                               injector.get("$httpBackend"),
                                               injector.get("$http"),
                                               injector.get("$log"));
    }
});


//test("Adding a post clears the message field", () => {

//    testScope.setupDefaultResponseToGetEntries();
//    testScope.createGuestbookCtrl();

//    testScope.guestBookCtrl.message = "not empty";
//    testScope.guestBookCtrl.addPost();

//    equal(testScope.guestBookCtrl.message, "", "Message filed is emply");
//});


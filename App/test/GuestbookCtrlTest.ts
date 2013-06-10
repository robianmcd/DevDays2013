/// <reference path="./testDefs.ts" />

class GuestBookCtrlTestScope {
    public guestBookCtrl: GuestBookCtrl = null;

    constructor(public userSessionService: UserSessionService,
                public $httpBackend: ng.IHttpBackendService,
                public $http: ng.IHttpService,
                public $log: ng.ILogService) {
        this.setupDefaultHttpResponses();
        this.createGuestbookCtrl();
        this.$httpBackend.flush();
    }

    public createGuestbookCtrl() {
        this.guestBookCtrl = new GuestBookCtrl(this.userSessionService, this.$http, this.$log);
    }

    public entriesFromServer: Data.GuestbookEntry[] = [new Data.GuestbookEntry("Rob", "Sample message."),
                                                    new Data.GuestbookEntry("Someone", "Another message.")];

    public setupDefaultHttpResponses() {
        this.$httpBackend.whenGET("/api/entries").respond((method, url, data, headers) => {
            return [<any>200, <any>this.entriesFromServer.slice(0), <any>{}];
        });
        this.$httpBackend.whenPOST("/api/entries").respond(200);
    }
}

var testScope: GuestBookCtrlTestScope;
var guestBookInjector = angular.injector(["GuestBookApp"]);

describe("The GuestBookCtrl", () => {

    beforeEach(inject(($httpBackend, $http, $log) => {
        testScope = new GuestBookCtrlTestScope(guestBookInjector.get("UserSessionService"),
                                               $httpBackend,
                                               $http,
                                               $log);
    }));

    it('should initialize its list of entries when created.', () => {
        expect(testScope.guestBookCtrl.entries).toEqual(testScope.entriesFromServer);
    });

    it('should clear the message after posting.', () => {
        testScope.guestBookCtrl.message = "not empty";

        testScope.guestBookCtrl.addPost();
        testScope.$httpBackend.flush();

        expect(testScope.guestBookCtrl.message).toBe("");
    });

    it('should send the username and message to the server when posting.', () => {
        var newEntry = new Data.GuestbookEntry("Test User", "Test Message.");
        testScope.guestBookCtrl.userName = newEntry.name;
        testScope.guestBookCtrl.message = newEntry.message;

        testScope.$httpBackend.expectPOST("/api/entries", JSON.stringify(newEntry));
        testScope.guestBookCtrl.addPost();
        testScope.$httpBackend.flush();
    });

    it('should show a new post after sending it to the server.', () => {
        var newEntry = new Data.GuestbookEntry("__username123__", "Test\nMessage.");
        testScope.guestBookCtrl.userName = newEntry.name;
        testScope.guestBookCtrl.message = newEntry.message;
        
        testScope.guestBookCtrl.addPost();
        testScope.entriesFromServer.push(newEntry);
        testScope.$httpBackend.flush();
        
        expect(testScope.guestBookCtrl.entries).toContain(newEntry);
    });
});

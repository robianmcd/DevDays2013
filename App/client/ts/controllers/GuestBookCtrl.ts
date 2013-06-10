/// <reference path="../AllDefs.ts" />

'use strict';

class GuestBookCtrl {

    entries: Data.GuestbookEntry[] = [];
    userName: string;
    favouriteColour: string;

    message: string;

    constructor(private UserSessionService: UserSessionService,
                private $http: ng.IHttpService,
                private $log: ng.ILogService)
    {
        this.$log.info("Initializing GuestBookCtrl");

        this.populateEntries();

        this.userName = UserSessionService.getName();
        this.favouriteColour = UserSessionService.getFavouriteColour();
    }

    public populateEntries() {
        
        //Add in the date and time here so that IE doesn't cache the response
        this.$http.get('/api/entries')
            .success((data, status, headers, config) => {
                this.onRecievedEntries(data, status, headers, config);
            })
            .error((data, status, headers, config) => {
                this.onFailedHttpRequest(data, status, headers, config);
            });
    }
    
        
    public addPost() {
        this.$http.post('/api/entries', new Data.GuestbookEntry(this.userName, this.message))
            .success((data, status, headers, config) => {
                this.populateEntries();
            });
        this.message = "";
        
    }

    private onRecievedEntries(data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) {
        this.$log.info("Successfully recieved entries from server");
        this.entries = data;
    }

    private onFailedHttpRequest(data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) {
        this.$log.error("An HTTP request to the server failed. status: " + status.toString() + " data: " + data);
    }
}
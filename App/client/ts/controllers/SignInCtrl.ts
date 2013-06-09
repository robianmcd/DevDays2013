/// <reference path="../AllDefs.ts" />

'use strict';

class SignInCtrl {
    name: string = "";
    quest: string = "";
    favouriteColour: string = "";

    constructor(private UserSessionService: UserSessionService,
                private $location: ng.ILocationService,
                private $log: ng.ILogService) {
        $log.info("Initializing SignInCtrl");
    }

    signIn() {
        this.UserSessionService.setName(this.name);
        this.UserSessionService.setFavouriteColour(this.favouriteColour);
        this.$location.path("GuestBook");
    }
}
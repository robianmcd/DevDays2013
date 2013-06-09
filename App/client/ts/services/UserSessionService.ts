/// <reference path="../AllDefs.ts" />

class UserSessionService {
    private cookieStore: ng.cookies.ICookieStoreService;

    constructor(cookieStore: ng.cookies.ICookieStoreService) {
        this.cookieStore = cookieStore;
    }

    public getName(): string {
        return this.cookieStore.get("name");
    }

    public setName(name: string) {
        this.cookieStore.put("name", name);
    }

    public getFavouriteColour(): string {
        return this.cookieStore.get("favouriteColour");
    }

    public setFavouriteColour(favouriteColour: string) {
        this.cookieStore.put("favouriteColour", favouriteColour);
    }
}
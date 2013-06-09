module Data {
    export class GuestbookEntry {
        //_id will be set by Mongo when you insert this into a table.
        public _id;

        // Constructor
        constructor(public name: string, public message: string) {

        }
    }
}

declare var exports: any;
if (typeof exports != 'undefined') {
    exports.GuestbookEntry = Data.GuestbookEntry;
}
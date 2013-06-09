// Interface
interface IConference {
    location: string;

    sessions: string[];
}

// Module
module Otpp {

    // Class
    export class DevDays implements IConference {
        public sessions: string[];

        private swag: string[];

        // Constructor
        constructor(public location: string,
                    public numAttendees: number) {
            //don't need to do anything here :)
        }

        public addSwag(newSwag: string) {
            this.swag.push(newSwag);
        }
    }

}

// Local variables
var devDays2013: IConference = new Otpp.DevDays("RTH", 26);
//devDays2013.sessions.p

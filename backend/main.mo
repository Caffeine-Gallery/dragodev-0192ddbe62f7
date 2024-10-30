import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Text "mo:base/Text";

actor WebsiteBuilder {
    type Element = {
        id : Text;
        elementType : Text;
        content : Text;
        styles : [(Text, Text)];
    };

    type Website = [Element];

    stable var websites : [Website] = [];

    public func saveWebsite(website : Website) : async () {
        websites := Array.append(websites, [website]);
    };

    public query func getWebsites() : async [Website] {
        websites
    };

    public query func getWebsite(index : Nat) : async ?Website {
        if (index < websites.size()) {
            ?websites[index]
        } else {
            null
        }
    };
}

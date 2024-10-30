import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Text "mo:base/Text";

actor WebsiteBuilder {
    type ElementStyle = {
        width : Text;
        fontSize : Text;
        color : Text;
        backgroundColor : Text;
        padding : Text;
        textAlign : Text;
        fontWeight : Text;
        fontStyle : Text;
        textDecoration : Text;
    };

    type Element = {
        id : Text;
        elementType : Text;
        content : Text;
        styles : ElementStyle;
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

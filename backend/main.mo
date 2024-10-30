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

    let defaultTemplate : Website = [
        {
            id = "header-1";
            elementType = "heading";
            content = "Welcome to My Website";
            styles = {
                width = "100%";
                fontSize = "32px";
                color = "#000000";
                backgroundColor = "#ffffff";
                padding = "20px";
                textAlign = "center";
                fontWeight = "bold";
                fontStyle = "normal";
                textDecoration = "none";
            };
        },
        {
            id = "paragraph-1";
            elementType = "paragraph";
            content = "This is a sample paragraph. You can edit this text to add your own content.";
            styles = {
                width = "100%";
                fontSize = "16px";
                color = "#333333";
                backgroundColor = "#ffffff";
                padding = "16px";
                textAlign = "left";
                fontWeight = "normal";
                fontStyle = "normal";
                textDecoration = "none";
            };
        },
        {
            id = "image-1";
            elementType = "image";
            content = "https://via.placeholder.com/800x400";
            styles = {
                width = "100%";
                fontSize = "16px";
                color = "#000000";
                backgroundColor = "#ffffff";
                padding = "16px";
                textAlign = "center";
                fontWeight = "normal";
                fontStyle = "normal";
                textDecoration = "none";
            };
        },
        {
            id = "button-1";
            elementType = "button";
            content = "Click Me";
            styles = {
                width = "auto";
                fontSize = "16px";
                color = "#ffffff";
                backgroundColor = "#007bff";
                padding = "10px 20px";
                textAlign = "center";
                fontWeight = "normal";
                fontStyle = "normal";
                textDecoration = "none";
            };
        },
    ];

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

    public query func getDefaultTemplate() : async Website {
        defaultTemplate
    };
}

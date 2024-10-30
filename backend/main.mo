import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Text "mo:base/Text";

actor WebsiteBuilder {
    type ElementStyle = {
        width : Text;
        height : Text;
        fontSize : Text;
        color : Text;
        backgroundColor : Text;
        padding : Text;
        margin : Text;
        textAlign : Text;
        fontWeight : Text;
        fontStyle : Text;
        textDecoration : Text;
        borderRadius : Text;
        boxShadow : Text;
    };

    type Element = {
        id : Text;
        elementType : Text;
        content : Text;
        styles : ElementStyle;
        children : [Element];
    };

    type Website = {
        elements : [Element];
        colorScheme : Text;
    };

    stable var websites : [Website] = [];

    let defaultTemplate : Website = {
        elements = [
            {
                id = "header-1";
                elementType = "header";
                content = "";
                styles = {
                    width = "100%";
                    height = "auto";
                    fontSize = "16px";
                    color = "#ffffff";
                    backgroundColor = "#4a4a4a";
                    padding = "20px";
                    margin = "0";
                    textAlign = "center";
                    fontWeight = "normal";
                    fontStyle = "normal";
                    textDecoration = "none";
                    borderRadius = "0";
                    boxShadow = "none";
                };
                children = [
                    {
                        id = "logo-1";
                        elementType = "image";
                        content = "https://via.placeholder.com/150x50?text=Logo";
                        styles = {
                            width = "auto";
                            height = "50px";
                            fontSize = "16px";
                            color = "#000000";
                            backgroundColor = "transparent";
                            padding = "0";
                            margin = "0 auto";
                            textAlign = "center";
                            fontWeight = "normal";
                            fontStyle = "normal";
                            textDecoration = "none";
                            borderRadius = "0";
                            boxShadow = "none";
                        };
                        children = [];
                    },
                    {
                        id = "nav-1";
                        elementType = "nav";
                        content = "";
                        styles = {
                            width = "100%";
                            height = "auto";
                            fontSize = "16px";
                            color = "#ffffff";
                            backgroundColor = "transparent";
                            padding = "10px 0";
                            margin = "10px 0 0 0";
                            textAlign = "center";
                            fontWeight = "normal";
                            fontStyle = "normal";
                            textDecoration = "none";
                            borderRadius = "0";
                            boxShadow = "none";
                        };
                        children = [
                            {
                                id = "nav-item-1";
                                elementType = "link";
                                content = "Home";
                                styles = {
                                    width = "auto";
                                    height = "auto";
                                    fontSize = "16px";
                                    color = "#ffffff";
                                    backgroundColor = "transparent";
                                    padding = "5px 10px";
                                    margin = "0 5px";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "3px";
                                    boxShadow = "none";
                                };
                                children = [];
                            },
                            {
                                id = "nav-item-2";
                                elementType = "link";
                                content = "About";
                                styles = {
                                    width = "auto";
                                    height = "auto";
                                    fontSize = "16px";
                                    color = "#ffffff";
                                    backgroundColor = "transparent";
                                    padding = "5px 10px";
                                    margin = "0 5px";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "3px";
                                    boxShadow = "none";
                                };
                                children = [];
                            },
                            {
                                id = "nav-item-3";
                                elementType = "link";
                                content = "Contact";
                                styles = {
                                    width = "auto";
                                    height = "auto";
                                    fontSize = "16px";
                                    color = "#ffffff";
                                    backgroundColor = "transparent";
                                    padding = "5px 10px";
                                    margin = "0 5px";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "3px";
                                    boxShadow = "none";
                                };
                                children = [];
                            },
                        ];
                    },
                ];
            },
            {
                id = "hero-1";
                elementType = "section";
                content = "";
                styles = {
                    width = "100%";
                    height = "500px";
                    fontSize = "16px";
                    color = "#ffffff";
                    backgroundColor = "#2c3e50";
                    padding = "50px 20px";
                    margin = "0";
                    textAlign = "center";
                    fontWeight = "normal";
                    fontStyle = "normal";
                    textDecoration = "none";
                    borderRadius = "0";
                    boxShadow = "none";
                };
                children = [
                    {
                        id = "hero-title-1";
                        elementType = "heading";
                        content = "Welcome to Our Website";
                        styles = {
                            width = "100%";
                            height = "auto";
                            fontSize = "48px";
                            color = "#ffffff";
                            backgroundColor = "transparent";
                            padding = "0";
                            margin = "0 0 20px 0";
                            textAlign = "center";
                            fontWeight = "bold";
                            fontStyle = "normal";
                            textDecoration = "none";
                            borderRadius = "0";
                            boxShadow = "none";
                        };
                        children = [];
                    },
                    {
                        id = "hero-subtitle-1";
                        elementType = "paragraph";
                        content = "Discover amazing features and create stunning websites with our builder.";
                        styles = {
                            width = "100%";
                            height = "auto";
                            fontSize = "24px";
                            color = "#ecf0f1";
                            backgroundColor = "transparent";
                            padding = "0";
                            margin = "0 0 30px 0";
                            textAlign = "center";
                            fontWeight = "normal";
                            fontStyle = "normal";
                            textDecoration = "none";
                            borderRadius = "0";
                            boxShadow = "none";
                        };
                        children = [];
                    },
                    {
                        id = "cta-button-1";
                        elementType = "button";
                        content = "Get Started";
                        styles = {
                            width = "auto";
                            height = "auto";
                            fontSize = "18px";
                            color = "#ffffff";
                            backgroundColor = "#e74c3c";
                            padding = "15px 30px";
                            margin = "0";
                            textAlign = "center";
                            fontWeight = "bold";
                            fontStyle = "normal";
                            textDecoration = "none";
                            borderRadius = "5px";
                            boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        };
                        children = [];
                    },
                ];
            },
            {
                id = "features-1";
                elementType = "section";
                content = "";
                styles = {
                    width = "100%";
                    height = "auto";
                    fontSize = "16px";
                    color = "#333333";
                    backgroundColor = "#ffffff";
                    padding = "50px 20px";
                    margin = "0";
                    textAlign = "center";
                    fontWeight = "normal";
                    fontStyle = "normal";
                    textDecoration = "none";
                    borderRadius = "0";
                    boxShadow = "none";
                };
                children = [
                    {
                        id = "features-title-1";
                        elementType = "heading";
                        content = "Our Features";
                        styles = {
                            width = "100%";
                            height = "auto";
                            fontSize = "36px";
                            color = "#2c3e50";
                            backgroundColor = "transparent";
                            padding = "0";
                            margin = "0 0 50px 0";
                            textAlign = "center";
                            fontWeight = "bold";
                            fontStyle = "normal";
                            textDecoration = "none";
                            borderRadius = "0";
                            boxShadow = "none";
                        };
                        children = [];
                    },
                    {
                        id = "features-grid-1";
                        elementType = "grid";
                        content = "";
                        styles = {
                            width = "100%";
                            height = "auto";
                            fontSize = "16px";
                            color = "#333333";
                            backgroundColor = "transparent";
                            padding = "0";
                            margin = "0";
                            textAlign = "left";
                            fontWeight = "normal";
                            fontStyle = "normal";
                            textDecoration = "none";
                            borderRadius = "0";
                            boxShadow = "none";
                        };
                        children = [
                            {
                                id = "feature-1";
                                elementType = "gridItem";
                                content = "";
                                styles = {
                                    width = "33.33%";
                                    height = "auto";
                                    fontSize = "16px";
                                    color = "#333333";
                                    backgroundColor = "transparent";
                                    padding = "20px";
                                    margin = "0";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "0";
                                    boxShadow = "none";
                                };
                                children = [
                                    {
                                        id = "feature-icon-1";
                                        elementType = "icon";
                                        content = "star";
                                        styles = {
                                            width = "50px";
                                            height = "50px";
                                            fontSize = "50px";
                                            color = "#3498db";
                                            backgroundColor = "transparent";
                                            padding = "0";
                                            margin = "0 auto 20px auto";
                                            textAlign = "center";
                                            fontWeight = "normal";
                                            fontStyle = "normal";
                                            textDecoration = "none";
                                            borderRadius = "0";
                                            boxShadow = "none";
                                        };
                                        children = [];
                                    },
                                    {
                                        id = "feature-title-1";
                                        elementType = "heading";
                                        content = "Easy to Use";
                                        styles = {
                                            width = "100%";
                                            height = "auto";
                                            fontSize = "24px";
                                            color = "#2c3e50";
                                            backgroundColor = "transparent";
                                            padding = "0";
                                            margin = "0 0 10px 0";
                                            textAlign = "center";
                                            fontWeight = "bold";
                                            fontStyle = "normal";
                                            textDecoration = "none";
                                            borderRadius = "0";
                                            boxShadow = "none";
                                        };
                                        children = [];
                                    },
                                    {
                                        id = "feature-description-1";
                                        elementType = "paragraph";
                                        content = "Our intuitive interface makes website building a breeze.";
                                        styles = {
                                            width = "100%";
                                            height = "auto";
                                            fontSize = "16px";
                                            color = "#7f8c8d";
                                            backgroundColor = "transparent";
                                            padding = "0";
                                            margin = "0";
                                            textAlign = "center";
                                            fontWeight = "normal";
                                            fontStyle = "normal";
                                            textDecoration = "none";
                                            borderRadius = "0";
                                            boxShadow = "none";
                                        };
                                        children = [];
                                    },
                                ];
                            },
                            {
                                id = "feature-2";
                                elementType = "gridItem";
                                content = "";
                                styles = {
                                    width = "33.33%";
                                    height = "auto";
                                    fontSize = "16px";
                                    color = "#333333";
                                    backgroundColor = "transparent";
                                    padding = "20px";
                                    margin = "0";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "0";
                                    boxShadow = "none";
                                };
                                children = [
                                    {
                                        id = "feature-icon-2";
                                        elementType = "icon";
                                        content = "paint-brush";
                                        styles = {
                                            width = "50px";
                                            height = "50px";
                                            fontSize = "50px";
                                            color = "#e74c3c";
                                            backgroundColor = "transparent";
                                            padding = "0";
                                            margin = "0 auto 20px auto";
                                            textAlign = "center";
                                            fontWeight = "normal";
                                            fontStyle = "normal";
                                            textDecoration = "none";
                                            borderRadius = "0";
                                            boxShadow = "none";
                                        };
                                        children = [];
                                    },
                                    {
                                        id = "feature-title-2";
                                        elementType = "heading";
                                        content = "Customizable";
                                        styles = {
                                            width = "100%";
                                            height = "auto";
                                            fontSize = "24px";
                                            color = "#2c3e50";
                                            backgroundColor = "transparent";
                                            padding = "0";
                                            margin = "0 0 10px 0";
                                            textAlign = "center";
                                            fontWeight = "bold";
                                            fontStyle = "normal";
                                            textDecoration = "none";
                                            borderRadius = "0";
                                            boxShadow = "none";
                                        };
                                        children = [];
                                    },
                                    {
                                        id = "feature-description-2";
                                        elementType = "paragraph";
                                        content = "Tailor your website to your exact needs with our powerful customization tools.";
                                        styles = {
                                            width = "100%";
                                            height = "auto";
                                            fontSize = "16px";
                                            color = "#7f8c8d";
                                            backgroundColor = "transparent";
                                            padding = "0";
                                            margin = "0";
                                            textAlign = "center";
                                            fontWeight = "normal";
                                            fontStyle = "normal";
                                            textDecoration = "none";
                                            borderRadius = "0";
                                            boxShadow = "none";
                                        };
                                        children = [];
                                    },
                                ];
                            },
                            {
                                id = "feature-3";
                                elementType = "gridItem";
                                content = "";
                                styles = {
                                    width = "33.33%";
                                    height = "auto";
                                    fontSize = "16px";
                                    color = "#333333";
                                    backgroundColor = "transparent";
                                    padding = "20px";
                                    margin = "0";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "0";
                                    boxShadow = "none";
                                };
                                children = [
                                    {
                                        id = "feature-icon-3";
                                        elementType = "icon";
                                        content = "mobile-alt";
                                        styles = {
                                            width = "50px";
                                            height = "50px";
                                            fontSize = "50px";
                                            color = "#2ecc71";
                                            backgroundColor = "transparent";
                                            padding = "0";
                                            margin = "0 auto 20px auto";
                                            textAlign = "center";
                                            fontWeight = "normal";
                                            fontStyle = "normal";
                                            textDecoration = "none";
                                            borderRadius = "0";
                                            boxShadow = "none";
                                        };
                                        children = [];
                                    },
                                    {
                                        id = "feature-title-3";
                                        elementType = "heading";
                                        content = "Responsive";
                                        styles = {
                                            width = "100%";
                                            height = "auto";
                                            fontSize = "24px";
                                            color = "#2c3e50";
                                            backgroundColor = "transparent";
                                            padding = "0";
                                            margin = "0 0 10px 0";
                                            textAlign = "center";
                                            fontWeight = "bold";
                                            fontStyle = "normal";
                                            textDecoration = "none";
                                            borderRadius = "0";
                                            boxShadow = "none";
                                        };
                                        children = [];
                                    },
                                    {
                                        id = "feature-description-3";
                                        elementType = "paragraph";
                                        content = "Your website will look great on any device, from desktop to mobile.";
                                        styles = {
                                            width = "100%";
                                            height = "auto";
                                            fontSize = "16px";
                                            color = "#7f8c8d";
                                            backgroundColor = "transparent";
                                            padding = "0";
                                            margin = "0";
                                            textAlign = "center";
                                            fontWeight = "normal";
                                            fontStyle = "normal";
                                            textDecoration = "none";
                                            borderRadius = "0";
                                            boxShadow = "none";
                                        };
                                        children = [];
                                    },
                                ];
                            },
                        ];
                    },
                ];
            },
        ];
        colorScheme = "default";
    };

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

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
        display : Text;
        flexDirection : Text;
        justifyContent : Text;
        alignItems : Text;
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
        theme : Text;
        fonts : [Text];
        globalStyles : {
            backgroundColor : Text;
            color : Text;
        };
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
                    backgroundColor = "#2c3e50";
                    padding = "20px";
                    margin = "0";
                    textAlign = "center";
                    fontWeight = "normal";
                    fontStyle = "normal";
                    textDecoration = "none";
                    borderRadius = "0";
                    boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                    display = "flex";
                    flexDirection = "column";
                    justifyContent = "center";
                    alignItems = "center";
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
                            margin = "0 0 20px 0";
                            textAlign = "center";
                            fontWeight = "normal";
                            fontStyle = "normal";
                            textDecoration = "none";
                            borderRadius = "0";
                            boxShadow = "none";
                            display = "block";
                            flexDirection = "row";
                            justifyContent = "center";
                            alignItems = "center";
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
                            margin = "0";
                            textAlign = "center";
                            fontWeight = "normal";
                            fontStyle = "normal";
                            textDecoration = "none";
                            borderRadius = "0";
                            boxShadow = "none";
                            display = "flex";
                            flexDirection = "row";
                            justifyContent = "center";
                            alignItems = "center";
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
                                    margin = "0 10px";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "3px";
                                    boxShadow = "none";
                                    display = "inline-block";
                                    flexDirection = "row";
                                    justifyContent = "center";
                                    alignItems = "center";
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
                                    margin = "0 10px";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "3px";
                                    boxShadow = "none";
                                    display = "inline-block";
                                    flexDirection = "row";
                                    justifyContent = "center";
                                    alignItems = "center";
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
                                    margin = "0 10px";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "3px";
                                    boxShadow = "none";
                                    display = "inline-block";
                                    flexDirection = "row";
                                    justifyContent = "center";
                                    alignItems = "center";
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
                    backgroundColor = "#3498db";
                    padding = "50px 20px";
                    margin = "0";
                    textAlign = "center";
                    fontWeight = "normal";
                    fontStyle = "normal";
                    textDecoration = "none";
                    borderRadius = "0";
                    boxShadow = "none";
                    display = "flex";
                    flexDirection = "column";
                    justifyContent = "center";
                    alignItems = "center";
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
                            display = "block";
                            flexDirection = "row";
                            justifyContent = "center";
                            alignItems = "center";
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
                            color = "#ffffff";
                            backgroundColor = "transparent";
                            padding = "0";
                            margin = "0 0 30px 0";
                            textAlign = "center";
                            fontWeight = "normal";
                            fontStyle = "normal";
                            textDecoration = "none";
                            borderRadius = "0";
                            boxShadow = "none";
                            display = "block";
                            flexDirection = "row";
                            justifyContent = "center";
                            alignItems = "center";
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
                            display = "inline-block";
                            flexDirection = "row";
                            justifyContent = "center";
                            alignItems = "center";
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
                    display = "flex";
                    flexDirection = "column";
                    justifyContent = "center";
                    alignItems = "center";
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
                            display = "block";
                            flexDirection = "row";
                            justifyContent = "center";
                            alignItems = "center";
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
                            display = "flex";
                            flexDirection = "row";
                            justifyContent = "space-between";
                            alignItems = "stretch";
                        };
                        children = [
                            {
                                id = "feature-1";
                                elementType = "gridItem";
                                content = "";
                                styles = {
                                    width = "30%";
                                    height = "auto";
                                    fontSize = "16px";
                                    color = "#333333";
                                    backgroundColor = "#f8f9fa";
                                    padding = "30px";
                                    margin = "0";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "10px";
                                    boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                                    display = "flex";
                                    flexDirection = "column";
                                    justifyContent = "center";
                                    alignItems = "center";
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
                                            display = "block";
                                            flexDirection = "row";
                                            justifyContent = "center";
                                            alignItems = "center";
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
                                            display = "block";
                                            flexDirection = "row";
                                            justifyContent = "center";
                                            alignItems = "center";
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
                                            display = "block";
                                            flexDirection = "row";
                                            justifyContent = "center";
                                            alignItems = "center";
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
                                    width = "30%";
                                    height = "auto";
                                    fontSize = "16px";
                                    color = "#333333";
                                    backgroundColor = "#f8f9fa";
                                    padding = "30px";
                                    margin = "0";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "10px";
                                    boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                                    display = "flex";
                                    flexDirection = "column";
                                    justifyContent = "center";
                                    alignItems = "center";
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
                                            display = "block";
                                            flexDirection = "row";
                                            justifyContent = "center";
                                            alignItems = "center";
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
                                            display = "block";
                                            flexDirection = "row";
                                            justifyContent = "center";
                                            alignItems = "center";
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
                                            display = "block";
                                            flexDirection = "row";
                                            justifyContent = "center";
                                            alignItems = "center";
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
                                    width = "30%";
                                    height = "auto";
                                    fontSize = "16px";
                                    color = "#333333";
                                    backgroundColor = "#f8f9fa";
                                    padding = "30px";
                                    margin = "0";
                                    textAlign = "center";
                                    fontWeight = "normal";
                                    fontStyle = "normal";
                                    textDecoration = "none";
                                    borderRadius = "10px";
                                    boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                                    display = "flex";
                                    flexDirection = "column";
                                    justifyContent = "center";
                                    alignItems = "center";
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
                                            display = "block";
                                            flexDirection = "row";
                                            justifyContent = "center";
                                            alignItems = "center";
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
                                            display = "block";
                                            flexDirection = "row";
                                            justifyContent = "center";
                                            alignItems = "center";
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
                                            display = "block";
                                            flexDirection = "row";
                                            justifyContent = "center";
                                            alignItems = "center";
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
        theme = "default";
        fonts = ["Arial", "Helvetica", "sans-serif"];
        globalStyles = {
            backgroundColor = "#ffffff";
            color = "#333333";
        };
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

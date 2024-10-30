export const idlFactory = ({ IDL }) => {
  const Element = IDL.Rec();
  const ElementStyle = IDL.Record({
    'height' : IDL.Text,
    'backgroundColor' : IDL.Text,
    'borderRadius' : IDL.Text,
    'textDecoration' : IDL.Text,
    'fontStyle' : IDL.Text,
    'flexDirection' : IDL.Text,
    'justifyContent' : IDL.Text,
    'color' : IDL.Text,
    'alignItems' : IDL.Text,
    'boxShadow' : IDL.Text,
    'fontWeight' : IDL.Text,
    'margin' : IDL.Text,
    'textAlign' : IDL.Text,
    'display' : IDL.Text,
    'width' : IDL.Text,
    'fontSize' : IDL.Text,
    'padding' : IDL.Text,
  });
  Element.fill(
    IDL.Record({
      'id' : IDL.Text,
      'styles' : ElementStyle,
      'content' : IDL.Text,
      'children' : IDL.Vec(Element),
      'elementType' : IDL.Text,
    })
  );
  const Website = IDL.Record({
    'fonts' : IDL.Vec(IDL.Text),
    'theme' : IDL.Text,
    'elements' : IDL.Vec(Element),
  });
  return IDL.Service({
    'getDefaultTemplate' : IDL.Func([], [Website], ['query']),
    'getWebsite' : IDL.Func([IDL.Nat], [IDL.Opt(Website)], ['query']),
    'getWebsites' : IDL.Func([], [IDL.Vec(Website)], ['query']),
    'saveWebsite' : IDL.Func([Website], [], []),
  });
};
export const init = ({ IDL }) => { return []; };

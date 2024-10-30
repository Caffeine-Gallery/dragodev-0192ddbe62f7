export const idlFactory = ({ IDL }) => {
  const ElementStyle = IDL.Record({
    'backgroundColor' : IDL.Text,
    'textDecoration' : IDL.Text,
    'fontStyle' : IDL.Text,
    'color' : IDL.Text,
    'fontWeight' : IDL.Text,
    'textAlign' : IDL.Text,
    'width' : IDL.Text,
    'fontSize' : IDL.Text,
    'padding' : IDL.Text,
  });
  const Element = IDL.Record({
    'id' : IDL.Text,
    'styles' : ElementStyle,
    'content' : IDL.Text,
    'elementType' : IDL.Text,
  });
  const Website = IDL.Vec(Element);
  return IDL.Service({
    'getDefaultTemplate' : IDL.Func([], [Website], ['query']),
    'getWebsite' : IDL.Func([IDL.Nat], [IDL.Opt(Website)], ['query']),
    'getWebsites' : IDL.Func([], [IDL.Vec(Website)], ['query']),
    'saveWebsite' : IDL.Func([Website], [], []),
  });
};
export const init = ({ IDL }) => { return []; };

export const idlFactory = ({ IDL }) => {
  const Element = IDL.Record({
    'id' : IDL.Text,
    'styles' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'content' : IDL.Text,
    'elementType' : IDL.Text,
  });
  const Website = IDL.Vec(Element);
  return IDL.Service({
    'getWebsite' : IDL.Func([IDL.Nat], [IDL.Opt(Website)], ['query']),
    'getWebsites' : IDL.Func([], [IDL.Vec(Website)], ['query']),
    'saveWebsite' : IDL.Func([Website], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
